import type { Movie } from '../types/movie'

export type SortMode = 'popular' | 'newest' | 'rating'

export function filterMovies(
  movies: Movie[],
  activeGenre: string,
  search: string,
  sort: SortMode,
): Movie[] {
  const query = search.toLowerCase().trim()
  const filtered = movies.filter(
    (movie) =>
      (activeGenre === 'Все фильмы' || movie.genre === activeGenre) &&
      (!query || movie.title.toLowerCase().includes(query)),
  )

  return [...filtered].sort((first, second) => {
    if (sort === 'newest') return second.year - first.year
    return second.rating - first.rating
  })
}
