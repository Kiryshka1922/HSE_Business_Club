import styles from "./EventCard.module.css";
import type { EventDto as Event } from "@/shared/schemas/schemas";
import LocationIcon from "@assets/icons/location.svg";
import ClockIcon from "@assets/icons/clock.svg";
import HeartIcon from "@assets/icons/like.svg";
import { GradientBox } from "@/shared/ui/GradientBox/GradientBox";
import { useEventStore } from "../../lib/useEventStore";

export const EventCard = ({
  event,
  time,
}: {
  event: Event[number];
  time: string;
}) => {
  const { toggleEventLike, events } = useEventStore();
  const isLiked = useEventStore((state) => {
    for (const events of state.events.values()) {
      const found = events.find((e) => e._id === event._id);
      if (found) return found.isLiked;
    }
    return undefined;
  });

  return (
    <GradientBox
      gradient={
        "linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))"
      }
      backgroundColor="#06081C"
    >
      <div className={styles.eventCard}>
        <img
          className={styles.eventCard__photo}
          src={event.photo_url}
          alt="person"
        />
        <div className={styles.eventCard__info}>
          <div className={styles.eventCard__speaker}>{event.speaker_name}</div>
          <div className={styles.eventCard__company}>{event.company_name}</div>
          <h3>{event.title}</h3>
          <div className={styles.eventCard__details}>
            <div className={styles.eventCard__details__item}>
              <LocationIcon />
              <span>{event.place}</span>
            </div>
            <div className={styles.eventCard__details__item}>
              <ClockIcon />
              <span>{time}</span>
            </div>
          </div>
        </div>
        <HeartIcon
          onClick={() => {
            toggleEventLike(event._id);
          }}
          className={
            styles.eventCard__like +
            " " +
            (isLiked ? styles.eventCard__like_liked : "")
          }
        />
      </div>
    </GradientBox>
  );
};
