import { create } from "zustand";
import { apiClient } from "@/shared/api/apiClient";
import { type EventDto, eventDtoSchema } from "@shared/schemas/schemas";

interface Store {
  fetchEvents: () => Promise<void>;
  toggleEventLike: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetStore: () => void;
  setEvents: (events: Map<string, EventDto>) => void;

  loading: boolean;
  error: string | null;
  events: Map<string, EventDto>;
}

export const useEventStore = create<Store>()((set, get) => ({
  events: new Map(),
  loading: false,
  error: null,
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const events = await apiClient.get<EventDto>(
        "/events",
        {},
        eventDtoSchema,
      );
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
      set({ events: preparedEvents, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch events",
        loading: false,
      });
    }
  },
  toggleEventLike: async (id: string) => {
    let currentEvent: EventDto[number] | undefined;
    let currentKey: string | undefined;

    for (const [key, events] of get().events.entries()) {
      const found = events.find((e) => e._id === id);
      if (found) {
        currentEvent = found;
        currentKey = key;
        break;
      }
    }

    if (!currentEvent || !currentKey) return;

    // Оптимистичное обновление
    set((state) => {
      const newEvents = new Map(state.events);
      const keyEvents = newEvents.get(currentKey) || [];

      const updatedEvents = keyEvents.map((event) =>
        event._id === id ? { ...event, isLiked: !event.isLiked } : event,
      );

      newEvents.set(currentKey, updatedEvents);
      return { events: newEvents };
    });

    try {
      await apiClient.patch(`/events/${id}`, {
        isLiked: !currentEvent.isLiked,
      });
    } catch (error) {
      // Откат при ошибке
      set((state) => {
        const newEvents = new Map(state.events);
        const keyEvents = newEvents.get(currentKey) || [];

        const revertedEvents = keyEvents.map((event) =>
          event._id === id
            ? { ...event, isLiked: currentEvent.isLiked }
            : event,
        );

        newEvents.set(currentKey, revertedEvents);
        return {
          events: newEvents,
          error:
            error instanceof Error ? error.message : "Failed to update like",
        };
      });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  resetStore: () => set({}),
  setEvents: (events: Map<string, EventDto>) => set({ events }),
}));
