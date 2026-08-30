import type { Movie } from '../types/movie'

type TmdbMovie = {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  genre_ids: number[]
}

type TmdbMovieDetails = Omit<TmdbMovie, 'genre_ids'> & {
  genres: Array<{ id: number; name: string }>
  runtime: number | null
}

type TmdbMoviesResponse = {
  results: TmdbMovie[]
}

const TMDB_API_URL = 'https://api.themoviedb.org/3/discover/movie'
const TMDB_MOVIE_URL = 'https://api.themoviedb.org/3/movie'
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w780'
const TMDB_BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280'

const genreNames: Record<number, string> = {
  18: 'Драма',
  35: 'Комедия',
  53: 'Триллер',
  878: 'Фантастика',
}

export async function getMovies(): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  if (!apiKey) {
    throw new Error('VITE_TMDB_API_KEY не настроен')
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    language: 'ru-RU',
    region: 'RU',
    include_adult: 'false',
    sort_by: 'popularity.desc',
    page: '1',
  })
  const response = await fetch(`${TMDB_API_URL}?${params}`)
  if (!response.ok) throw new Error(`TMDB ответил с кодом ${response.status}`)

  const data: TmdbMoviesResponse = await response.json()
  return data.results
    .filter((movie) => movie.poster_path)
    .map((movie) => {
      const genreId = movie.genre_ids.find((id) => genreNames[id])

      return {
        id: movie.id,
        title: movie.title,
        year: Number(movie.release_date.slice(0, 4)) || 0,
        genre: genreId ? genreNames[genreId] : 'Фильм',
        runtime: '—',
        rating: Number(movie.vote_average.toFixed(1)),
        description: movie.overview || 'Описание фильма пока недоступно.',
        poster: `${TMDB_IMAGE_URL}${movie.poster_path}`,
        backdrop: movie.backdrop_path
          ? `${TMDB_BACKDROP_URL}${movie.backdrop_path}`
          : undefined,
        accent: '#343a46',
      }
    })
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  if (!apiKey) {
    throw new Error('VITE_TMDB_API_KEY не настроен')
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    language: 'ru-RU',
  })
  const response = await fetch(`${TMDB_MOVIE_URL}/${id}?${params}`)
  if (!response.ok) throw new Error(`TMDB ответил с кодом ${response.status}`)

  const movie: TmdbMovieDetails = await response.json()
  const genre = movie.genres[0]

  return {
    id: movie.id,
    title: movie.title,
    year: Number(movie.release_date.slice(0, 4)) || 0,
    genre: genre?.name ?? 'Фильм',
    runtime: movie.runtime
      ? `${Math.floor(movie.runtime / 60)}ч ${movie.runtime % 60}м`
      : '—',
    rating: Number(movie.vote_average.toFixed(1)),
    description: movie.overview || 'Описание фильма пока недоступно.',
    poster: movie.poster_path ? `${TMDB_IMAGE_URL}${movie.poster_path}` : '',
    backdrop: movie.backdrop_path
      ? `${TMDB_BACKDROP_URL}${movie.backdrop_path}`
      : undefined,
    accent: '#343a46',
  }
}
