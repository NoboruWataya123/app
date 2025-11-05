'use client';

import React, { useRef } from 'react';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import styles from './MovieRow.module.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies.length) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.rowWrapper}>
        <button
          className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
          onClick={() => scroll('left')}
          aria-label="Прокрутить влево"
        >
          ‹
        </button>

        <div className={styles.row} ref={rowRef}>
          {movies.map((movie, index) => (
            <div key={movie.id} className={styles.cardWrapper}>
              <MovieCard movie={movie} priority={index < 6} />
            </div>
          ))}
        </div>

        <button
          className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
          onClick={() => scroll('right')}
          aria-label="Прокрутить вправо"
        >
          ›
        </button>
      </div>
    </div>
  );
};
