import type { CSSProperties, SyntheticEvent } from 'react'
import { Badge } from '../ui/badge'
import type { Movie } from '../../types/movie'
import styles from './MovieCard.module.css'

type MovieCardProps = {
  movie: Movie
  index: number
  accent: string
  isSaved: boolean
  onToggleSaved: (title: string) => void
  onOpen: (movie: Movie) => void
  onPosterLoad: (event: SyntheticEvent<HTMLImageElement>, title: string) => void
}

export function MovieCard({
  movie,
  index,
  accent,
  isSaved,
  onToggleSaved,
  onOpen,
  onPosterLoad,
}: MovieCardProps) {
  return (
    <article
      className={styles.card}
      tabIndex={0}
      onClick={() => onOpen(movie)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
          onOpen(movie)
        }
      }}
      style={
        {
          '--accent': accent,
          '--delay': `${index * 70}ms`,
        } as CSSProperties
      }
    >
      <div
        className={styles.poster}
        data-poster={movie.poster}
        style={{ '--poster-image': `url("${movie.poster}")` } as CSSProperties}
      >
        <span className={styles.skeleton} aria-hidden="true" />
        <img
          className={styles.posterImage}
          crossOrigin="anonymous"
          loading="lazy"
          src={movie.poster}
          alt={`Постер фильма «${movie.title}»`}
          onLoad={(event) => {
            event.currentTarget.classList.add(styles.isLoaded)
            onPosterLoad(event, movie.title)
          }}
        />
        <button
          className={styles.saveButton}
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleSaved(movie.title)
          }}
          aria-label={`${isSaved ? 'Убрать' : 'Добавить'} «${movie.title}» ${isSaved ? 'из' : 'в'} мой список`}
        >
          {isSaved ? '✓' : '+'}
        </button>
        <Badge className={styles.rating} variant="secondary">
          <b>★</b>
          {movie.rating.toFixed(1)}
        </Badge>
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <Badge variant="outline">{movie.genre}</Badge>
          <Badge variant="outline">{movie.year}</Badge>
          <Badge variant="outline">{movie.runtime}</Badge>
        </div>
        <h3 className={styles.title}>{movie.title}</h3>
        {/* <p className={styles.description}>{movie.description}</p> */}
      </div>
    </article>
  )
}
