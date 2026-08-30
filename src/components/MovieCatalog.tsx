import type { SyntheticEvent } from 'react'
import type { Movie } from '../types/movie'
import { MovieCard } from './MovieCard/MovieCard'

type MovieCatalogProps = {
  movies: Movie[]
  activeGenre: string
  savedMovies: string[]
  posterColors: Record<string, string>
  isLoading: boolean
  error: string | null
  onToggleSaved: (title: string) => void
  onOpen: (movie: Movie) => void
  onPosterLoad: (event: SyntheticEvent<HTMLImageElement>, title: string) => void
}

export function MovieCatalog({
  movies,
  activeGenre,
  savedMovies,
  posterColors,
  isLoading,
  error,
  onToggleSaved,
  onOpen,
  onPosterLoad,
}: MovieCatalogProps) {
  return (
    <section className="catalog" aria-live="polite">
      <div className="catalog-heading">
        <h2>{activeGenre === 'Все фильмы' ? 'Все фильмы' : activeGenre}</h2>
        <span>{movies.length} фильма</span>
      </div>
      {isLoading ? (
        <div className="empty-state">
          <h3>Загружаем фильмы</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
        </div>
      ) : movies.length ? (
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.title}
              movie={movie}
              index={index}
              accent={posterColors[movie.title] ?? movie.accent}
              isSaved={savedMovies.includes(movie.title)}
              onToggleSaved={onToggleSaved}
              onOpen={onOpen}
              onPosterLoad={onPosterLoad}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>⌕</span>
          <h3>Фильм не найден</h3>
          <p>Попробуйте изменить запрос или выбрать другой жанр.</p>
        </div>
      )}
    </section>
  )
}
