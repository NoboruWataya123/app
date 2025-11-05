import { Movie, Category } from '@/types';
import { mockMovies, categories } from '@/lib/data/movies';

// Mock API with simulated delay for realistic behavior
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const moviesApi = {
  // Get all categories with movies
  async getCategories(): Promise<Category[]> {
    await delay(300);
    return categories;
  },

  // Get featured movies for hero section
  async getFeaturedMovies(): Promise<Movie[]> {
    await delay(200);
    return mockMovies.filter((m) => m.isFeatured);
  },

  // Get movie by ID
  async getMovieById(id: string): Promise<Movie | null> {
    await delay(200);
    return mockMovies.find((m) => m.id === id) || null;
  },

  // Search movies
  async searchMovies(query: string): Promise<Movie[]> {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(lowercaseQuery) ||
        m.description.toLowerCase().includes(lowercaseQuery) ||
        m.genres.some((g) => g.toLowerCase().includes(lowercaseQuery))
    );
  },

  // Get movies by genre
  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    await delay(200);
    return mockMovies.filter((m) => m.genres.includes(genre));
  },

  // Get similar movies
  async getSimilarMovies(movieId: string): Promise<Movie[]> {
    await delay(200);
    const movie = mockMovies.find((m) => m.id === movieId);
    if (!movie) return [];

    return mockMovies
      .filter((m) => {
        if (m.id === movieId) return false;
        // Find movies with overlapping genres
        return m.genres.some((g) => movie.genres.includes(g));
      })
      .slice(0, 6);
  },

  // Get all movies
  async getAllMovies(): Promise<Movie[]> {
    await delay(200);
    return mockMovies;
  },
};
