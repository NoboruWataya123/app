import { Suspense } from 'react';
import { moviesApi } from '@/lib/api/movies';
import { Hero } from '@/components/movie/Hero';
import { MovieRow } from '@/components/movie/MovieRow';
import { Loading } from '@/components/ui/Loading';

export default async function HomePage() {
  const [featuredMovies, categories] = await Promise.all([
    moviesApi.getFeaturedMovies(),
    moviesApi.getCategories(),
  ]);

  const heroMovie = featuredMovies[0];

  return (
    <main>
      {heroMovie && (
        <Suspense fallback={<Loading fullScreen />}>
          <Hero movie={heroMovie} />
        </Suspense>
      )}

      <div style={{ marginTop: '-150px', position: 'relative', zIndex: 10 }}>
        {categories.map((category) => (
          <MovieRow key={category.id} title={category.name} movies={category.movies} />
        ))}
      </div>
    </main>
  );
}
