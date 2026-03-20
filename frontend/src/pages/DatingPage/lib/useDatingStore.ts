import { create } from "zustand";
import { apiClient } from "@/shared/api/apiClient";
import { type PeopleDto, peopleDtoSchema } from "@shared/schemas/schemas";

interface Store {
  fetchPeoples: () => Promise<void>;
  togglePeopleLike: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetStore: () => void;
  setPeoples: (events: PeopleDto) => void;

  loading: boolean;
  error: string | null;
  peoples: PeopleDto;
}

export const useDatingtStore = create<Store>()((set, get) => ({
  peoples: [],
  loading: false,
  error: null,
  fetchPeoples: async () => {
    set({ loading: true, error: null });
    try {
      const peoples = await apiClient.get<PeopleDto>(
        "/peoples",
        {},
        peopleDtoSchema,
      );
      set({ peoples, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch events",
        loading: false,
      });
    }
  },
  togglePeopleLike: async (id: string) => {
    let currentPeople: PeopleDto[number] | undefined = get().peoples.find(
      (people) => people._id === id,
    );

    if (!currentPeople) return;

    // Оптимистичное обновление
    set(() => {
      const newPeoples = [
        ...get().peoples,
        { ...currentPeople, isLiked: !currentPeople.isLiked },
      ];

      return { peoples: newPeoples };
    });

    try {
      await apiClient.patch(`/peoples/${id}`, {
        isLiked: !currentPeople.isLiked,
      });
    } catch (error) {
      // Откат при ошибке
      set(() => {
        const newPeoples = [
          ...get().peoples,
          { ...currentPeople, isLiked: !currentPeople.isLiked },
        ];

        return {
          peoples: newPeoples,
          error:
            error instanceof Error ? error.message : "Failed to update like",
        };
      });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  resetStore: () => set({}),
  setPeoples: (peoples: PeopleDto) => set({ peoples }),
}));
