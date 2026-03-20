import { apiClient } from "src/shared/api/apiClient";
import { eventDtoSchema, type EventDto } from "@shared/schemas/schemas";
import { EventCard } from "./ui/EventCard/EventCard";
import styles from "./EventPage.module.css";
import { useEventStore } from "./lib/useEventStore";
import { useLayoutEffect } from "react";

export async function loader() {
  const events = await apiClient.get<EventDto>("/events", {}, eventDtoSchema);
  const preparedEvents = new Map<string, typeof events>();
  events.forEach((event) => {
    const startTime = Number(event.start_time.split(":")[0]);
    const key =
      startTime.toString().padStart(2, "0") +
      ":00" +
      " - " +
      (startTime + 1).toString().padStart(2, "0") +
      ":00";

    if (preparedEvents.has(key)) {
      preparedEvents.get(key)?.push(event);
    } else {
      preparedEvents.set(key, [event]);
    }
  });
  return preparedEvents;
}

export default function EventsPage({
  loaderData,
}: {
  loaderData: Map<string, EventDto>;
}) {
  const { setEvents } = useEventStore();

  // Инициализируем стор данными
  useLayoutEffect(() => {
    if (loaderData.size > 0) {
      setEvents(loaderData);
    }
  }, [loaderData, setEvents]);
  return (
    <div className={styles.eventsPage}>
      <h1>Расписание</h1>

      <div className={styles.eventsPage__events}>
        {Array.from(loaderData.entries()).map(([time, events]) => {
          return (
            <div key={time}>
              <div className={styles.eventsPage__timeWrapper}>
                <span className={styles.eventsPage__time}>{time}</span>
                <div className={styles.eventsPage__devider} />
              </div>
              <div className={styles.eventsPage__events}>
                {events.map((event) => (
                  <EventCard key={event._id} event={event} time={time} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.diamond}></div>
      <div className={styles.diamond + " " + styles.diamond_2}></div>
      <div className={styles.diamond + " " + styles.diamond_3}></div>
      <div className={styles.diamond + " " + styles.diamond_4}></div>
    </div>
  );
}
