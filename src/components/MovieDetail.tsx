import type { CSSProperties } from 'react'
import { Button } from './ui/button'
import type { Movie } from '../types/movie'

type MovieDetailProps = {
  movie: Movie
  isSaved: boolean
  onBack: () => void
  onToggleSaved: () => void
}

export function MovieDetail({ movie, isSaved, onBack, onToggleSaved }: MovieDetailProps) {
  return (
    <section
      className="movie-detail"
      aria-labelledby="movie-detail-title"
      style={
        {
          '--detail-backdrop': `url("${movie.backdrop ?? movie.poster}")`,
        } as CSSProperties
      }
    >
      <button className="detail-back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Назад к фильмам
      </button>
      <div className="detail-layout">
        <div className="detail-poster-wrap">
          <img src={movie.poster} alt={`Постер фильма «${movie.title}»`} />
          <span className="detail-rating">
            <b>★</b> {movie.rating.toFixed(1)}
          </span>
        </div>
        <div className="detail-content">
          <p className="eyebrow">Детали фильма</p>
          <h1 id="movie-detail-title">{movie.title}</h1>
          <div className="detail-meta" aria-label="Информация о фильме">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>{movie.runtime}</span>
          </div>
          <p className="detail-description">{movie.description}</p>
          <div className="detail-actions">
            <Button className="hero-button hero-button-primary" type="button">
              ▶&nbsp; Смотреть
            </Button>
            <Button
              className="hero-button hero-button-secondary"
              variant="secondary"
              type="button"
              onClick={onToggleSaved}
            >
              {isSaved ? '✓ В моём списке' : '+ Мой список'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
