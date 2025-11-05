// Core types for the streaming service

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  backdropUrl: string;
  videoUrl: string;
  trailerUrl?: string;
  duration: number; // in minutes
  releaseYear: number;
  rating: number; // 0-10
  genres: string[];
  director: string;
  cast: string[];
  country: string;
  language: string;
  isIndieFilm: boolean;
  isFeatured?: boolean;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  watchlist: string[]; // movie IDs
  continueWatching: ContinueWatching[];
}

export interface ContinueWatching {
  movieId: string;
  progress: number; // 0-100
  lastWatched: Date;
}

export type Genre =
  | 'Drama'
  | 'Comedy'
  | 'Thriller'
  | 'Documentary'
  | 'Romance'
  | 'Horror'
  | 'Action'
  | 'Sci-Fi'
  | 'Animation'
  | 'Historical';
