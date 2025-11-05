import { create } from 'zustand';
import { Movie, Category } from '@/types';

interface MovieStore {
  // State
  categories: Category[];
  featuredMovies: Movie[];
  currentMovie: Movie | null;
  searchQuery: string;
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCategories: (categories: Category[]) => void;
  setFeaturedMovies: (movies: Movie[]) => void;
  setCurrentMovie: (movie: Movie | null) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSearch: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  // Initial state
  categories: [],
  featuredMovies: [],
  currentMovie: null,
  searchQuery: '',
  searchResults: [],
  isLoading: false,
  error: null,

  // Actions
  setCategories: (categories) => set({ categories }),
  setFeaturedMovies: (movies) => set({ featuredMovies: movies }),
  setCurrentMovie: (movie) => set({ currentMovie: movie }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearSearch: () => set({ searchQuery: '', searchResults: [] }),
}));
