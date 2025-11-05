'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types';
import { formatDuration, formatRating } from '@/lib/utils/format';
import { useUserStore } from '@/store/useUserStore';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, priority = false }) => {
  const [imageError, setImageError] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useUserStore();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {!imageError ? (
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>🎬</span>
          </div>
        )}

        <div className={styles.overlay}>
          <div className={styles.info}>
            <h3 className={styles.title}>{movie.title}</h3>
            <div className={styles.meta}>
              <span className={styles.rating}>⭐ {formatRating(movie.rating)}</span>
              <span className={styles.duration}>{formatDuration(movie.duration)}</span>
              <span className={styles.year}>{movie.releaseYear}</span>
            </div>
            <div className={styles.genres}>
              {movie.genres.slice(0, 2).map((genre) => (
                <span key={genre} className={styles.genre}>
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.watchlistBtn}
              onClick={handleWatchlistClick}
              aria-label={inWatchlist ? 'Удалить из списка' : 'Добавить в список'}
            >
              {inWatchlist ? '✓' : '+'}
            </button>
          </div>
        </div>

        {movie.isIndieFilm && (
          <div className={styles.badge}>Indie</div>
        )}
      </div>
    </Link>
  );
};
