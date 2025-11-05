'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/types';
import { moviesApi } from '@/lib/api/movies';
import { useUserStore } from '@/store/useUserStore';
import { MovieCard } from '@/components/movie/MovieCard';
import { Loading } from '@/components/ui/Loading';
import styles from './page.module.css';

export default function WatchlistPage() {
  const { watchlist, continueWatching: continueWatchingData } = useUserStore();
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [continueWatchingMovies, setContinueWatchingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const allMovies = await moviesApi.getAllMovies();

        // Get watchlist movies
        const watchlistItems = allMovies.filter((m) => watchlist.includes(m.id));
        setWatchlistMovies(watchlistItems);

        // Get continue watching movies
        const continueItems = allMovies.filter((m) =>
          continueWatchingData.some((cw) => cw.movieId === m.id)
        );
        setContinueWatchingMovies(continueItems);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [watchlist, continueWatchingData]);

  if (loading) {
    return <Loading fullScreen />;
  }

  const hasContent = watchlistMovies.length > 0 || continueWatchingMovies.length > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Мой список</h1>

      {!hasContent ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>⭐</p>
          <h2 className={styles.emptyTitle}>Ваш список пуст</h2>
          <p className={styles.emptyText}>
            Добавляйте фильмы в список, чтобы смотреть их позже
          </p>
        </div>
      ) : (
        <>
          {continueWatchingMovies.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Продолжить просмотр</h2>
              <div className={styles.grid}>
                {continueWatchingMovies.map((movie) => {
                  const progress = continueWatchingData.find(
                    (cw) => cw.movieId === movie.id
                  )?.progress || 0;

                  return (
                    <div key={movie.id} className={styles.cardWrapper}>
                      <MovieCard movie={movie} />
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {watchlistMovies.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Мой список</h2>
              <div className={styles.grid}>
                {watchlistMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
