import { notFound } from 'next/navigation';
import { moviesApi } from '@/lib/api/movies';
import { VideoPlayer } from '@/components/player/VideoPlayer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await moviesApi.getMovieById(id);

  if (!movie) {
    notFound();
  }

  return (
    <VideoPlayer
      movieId={movie.id}
      movieTitle={movie.title}
      videoUrl={movie.videoUrl}
    />
  );
}
