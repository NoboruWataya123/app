import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ContinueWatching {
  movieId: string;
  progress: number; // 0-100
  lastWatched: string; // ISO date string
}

interface UserStore {
  // State
  watchlist: string[];
  continueWatching: ContinueWatching[];

  // Actions
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  updateProgress: (movieId: string, progress: number) => void;
  getContinueWatching: () => ContinueWatching[];
  clearProgress: (movieId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      watchlist: [],
      continueWatching: [],

      // Actions
      addToWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.includes(movieId)
            ? state.watchlist
            : [...state.watchlist, movieId],
        })),

      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((id) => id !== movieId),
        })),

      isInWatchlist: (movieId) => get().watchlist.includes(movieId),

      updateProgress: (movieId, progress) =>
        set((state) => {
          const existing = state.continueWatching.find(
            (item) => item.movieId === movieId
          );

          if (existing) {
            return {
              continueWatching: state.continueWatching.map((item) =>
                item.movieId === movieId
                  ? { ...item, progress, lastWatched: new Date().toISOString() }
                  : item
              ),
            };
          }

          return {
            continueWatching: [
              ...state.continueWatching,
              {
                movieId,
                progress,
                lastWatched: new Date().toISOString(),
              },
            ],
          };
        }),

      getContinueWatching: () => {
        return get()
          .continueWatching
          .sort(
            (a, b) =>
              new Date(b.lastWatched).getTime() -
              new Date(a.lastWatched).getTime()
          );
      },

      clearProgress: (movieId) =>
        set((state) => ({
          continueWatching: state.continueWatching.filter(
            (item) => item.movieId !== movieId
          ),
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);
