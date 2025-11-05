import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { moviesApi } from '@/lib/api/movies';
import { formatDuration, formatRating, formatViews } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { MovieRow } from '@/components/movie/MovieRow';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movie = await moviesApi.getMovieById(id);

  if (!movie) {
    notFound();
  }

  const similarMovies = await moviesApi.getSimilarMovies(id);

  return (
    <div className={styles.container}>
      <div className={styles.backdrop}>
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className={styles.backdropImage}
          priority
          quality={90}
        />
        <div className={styles.gradient} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.poster}>
            <Image
              src={movie.thumbnailUrl}
              alt={movie.title}
              fill
              className={styles.posterImage}
              priority
            />
            {movie.isIndieFilm && <span className={styles.badge}>Indie</span>}
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.meta}>
              <span className={styles.rating}>⭐ {formatRating(movie.rating)}</span>
              <span className={styles.year}>{movie.releaseYear}</span>
              <span className={styles.duration}>{formatDuration(movie.duration)}</span>
              <span className={styles.views}>👁 {formatViews(movie.views)}</span>
            </div>

            <p className={styles.description}>{movie.description}</p>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Режиссёр:</span>
                <span className={styles.detailValue}>{movie.director}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>В ролях:</span>
                <span className={styles.detailValue}>
                  {movie.cast.length > 0 ? movie.cast.join(', ') : 'Не указано'}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Жанры:</span>
                <span className={styles.detailValue}>{movie.genres.join(', ')}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Страна:</span>
                <span className={styles.detailValue}>{movie.country}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Язык:</span>
                <span className={styles.detailValue}>{movie.language}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href={`/watch/${movie.id}`}>
                <Button size="large">▶ Смотреть</Button>
              </Link>
              {movie.trailerUrl && (
                <Button variant="secondary" size="large">
                  🎬 Трейлер
                </Button>
              )}
            </div>
          </div>
        </div>

        {similarMovies.length > 0 && (
          <div className={styles.similar}>
            <MovieRow title="Похожие фильмы" movies={similarMovies} />
          </div>
        )}
      </div>
    </div>
  );
}
