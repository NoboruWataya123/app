'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { formatDuration, formatRating } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/store/useUserStore';
import styles from './Hero.module.css';

interface HeroProps {
  movie: Movie;
}

export const Hero: React.FC<HeroProps> = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useUserStore();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.backdrop}>
        {!imageError ? (
          <Image
            src={movie.backdropUrl}
            alt={movie.title}
            fill
            className={styles.backdropImage}
            priority
            quality={90}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.backdropPlaceholder} />
        )}
        <div className={styles.gradient} />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          {movie.isIndieFilm && <span className={styles.badge}>Indie Film</span>}

          <h1 className={styles.title}>{movie.title}</h1>

          <div className={styles.meta}>
            <span className={styles.rating}>⭐ {formatRating(movie.rating)}</span>
            <span className={styles.year}>{movie.releaseYear}</span>
            <span className={styles.duration}>{formatDuration(movie.duration)}</span>
          </div>

          <p className={styles.description}>{movie.description}</p>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Режиссёр:</span>
              <span className={styles.detailValue}>{movie.director}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Жанры:</span>
              <span className={styles.detailValue}>{movie.genres.join(', ')}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href={`/watch/${movie.id}`}>
              <Button size="large">▶ Смотреть</Button>
            </Link>
            <Button
              variant="secondary"
              size="large"
              onClick={handleWatchlistClick}
            >
              {inWatchlist ? '✓ В списке' : '+ Мой список'}
            </Button>
            <Link href={`/movies/${movie.id}`}>
              <Button variant="ghost" size="large">
                ℹ Подробнее
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
