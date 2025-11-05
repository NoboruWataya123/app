'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Movie, Category } from '@/types';
import { moviesApi } from '@/lib/api/movies';
import { MovieCard } from '@/components/movie/MovieCard';
import { Loading } from '@/components/ui/Loading';
import styles from './page.module.css';

export function BrowseContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const categoryParam = searchParams.get('category');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (query) {
          const results = await moviesApi.searchMovies(query);
          setMovies(results);
        } else if (categoryParam === 'indie') {
          const allMovies = await moviesApi.getAllMovies();
          setMovies(allMovies.filter((m) => m.isIndieFilm));
        } else if (categoryParam === 'new') {
          const allMovies = await moviesApi.getAllMovies();
          setMovies(allMovies.filter((m) => m.releaseYear === 2024));
        } else {
          const allMovies = await moviesApi.getAllMovies();
          setMovies(allMovies);
        }

        const cats = await moviesApi.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [query, categoryParam]);

  const genres = ['all', 'Drama', 'Comedy', 'Thriller', 'Documentary', 'Romance', 'Horror', 'Sci-Fi'];

  const filteredMovies =
    selectedGenre === 'all'
      ? movies
      : movies.filter((m) => m.genres.includes(selectedGenre));

  const getTitle = () => {
    if (query) return `Результаты поиска: "${query}"`;
    if (categoryParam === 'indie') return 'Независимое кино';
    if (categoryParam === 'new') return 'Новинки 2024';
    return 'Все фильмы';
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{getTitle()}</h1>
        <p className={styles.count}>
          {filteredMovies.length} {filteredMovies.length === 1 ? 'фильм' : 'фильмов'}
        </p>
      </div>

      {!query && (
        <div className={styles.filters}>
          <div className={styles.genreFilters}>
            {genres.map((genre) => (
              <button
                key={genre}
                className={`${styles.genreBtn} ${selectedGenre === genre ? styles.active : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre === 'all' ? 'Все жанры' : genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredMovies.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>🎬</p>
          <h2 className={styles.emptyTitle}>Фильмы не найдены</h2>
          <p className={styles.emptyText}>
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
