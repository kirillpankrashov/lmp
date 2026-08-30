import { useEffect, useMemo, useState } from 'react'
import { CatalogToolbar } from './components/CatalogToolbar/CatalogToolbar'
import { MovieDetail } from './components/MovieDetail'
import { MovieCatalog } from './components/MovieCatalog'
import { getMovieDetails } from './api/movies'
import { genres } from './data/movies'
import { usePosterColors } from './hooks/usePosterColors'
import { useTvNavigation } from './hooks/useTvNavigation'
import { useMovieStore } from './store/useMovieStore'
import type { Movie } from './types/movie'
import { filterMovies } from './lib/movieFilters'
import './App.css'

function App() {
  const movies = useMovieStore((state) => state.movies)
  const activeGenre = useMovieStore((state) => state.activeGenre)
  const search = useMovieStore((state) => state.search)
  const sort = useMovieStore((state) => state.sort)
  const savedMovies = useMovieStore((state) => state.savedMovies)
  const isLoading = useMovieStore((state) => state.isLoading)
  const error = useMovieStore((state) => state.error)
  const loadMovies = useMovieStore((state) => state.loadMovies)
  const setActiveGenre = useMovieStore((state) => state.setActiveGenre)
  const setSearch = useMovieStore((state) => state.setSearch)
  const setSort = useMovieStore((state) => state.setSort)
  const toggleSavedMovie = useMovieStore((state) => state.toggleSavedMovie)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const { posterColors, extractPosterColor } = usePosterColors()

  useTvNavigation()

  useEffect(() => {
    void loadMovies()
  }, [loadMovies])

  useEffect(() => {
    const handleLocationChange = () => {
      if (!window.location.pathname.startsWith('/movie/')) {
        setSelectedMovie(null)
        setMovieDetails(null)
        setDetailError(null)
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const filteredMovies = useMemo(() => {
    return filterMovies(movies, activeGenre, search, sort)
  }, [activeGenre, movies, search, sort])

  const openMovie = async (movie: Movie, updateUrl = true) => {
    if (updateUrl && movie.id) {
      window.history.pushState({}, '', `/movie/${movie.id}`)
    }

    setSelectedMovie(movie)
    setMovieDetails(null)
    setDetailError(null)

    if (!movie.id) {
      setMovieDetails(movie)
      return
    }

    setIsDetailLoading(true)
    try {
      setMovieDetails(await getMovieDetails(movie.id))
    } catch {
      setDetailError('Не удалось загрузить детали фильма')
    } finally {
      setIsDetailLoading(false)
    }
  }

  useEffect(() => {
    const match = window.location.pathname.match(/^\/movie\/(\d+)$/)
    if (!match || !movies.length || selectedMovie) return

    const movie = movies.find((item) => item.id === Number(match[1]))
    if (movie) void openMovie(movie, false)
  }, [movies, selectedMovie])

  const closeMovie = () => {
    window.history.pushState({}, '', '/')
    setSelectedMovie(null)
    setMovieDetails(null)
    setDetailError(null)
  }

  return (
    <main className="app-shell">
      {selectedMovie ? (
        isDetailLoading ? (
          <div className="empty-state detail-loading">
            <h3>Загружаем детали фильма</h3>
          </div>
        ) : detailError ? (
          <div className="empty-state detail-loading">
            <h3>{detailError}</h3>
            <button type="button" onClick={closeMovie}>
              Вернуться к фильмам
            </button>
          </div>
        ) : movieDetails ? (
          <MovieDetail
            movie={movieDetails}
            isSaved={savedMovies.includes(movieDetails.title)}
            onBack={closeMovie}
            onToggleSaved={() => toggleSavedMovie(movieDetails.title)}
          />
        ) : null
      ) : (
        <>
          {/* <HeroSection
            isSaved={savedMovies.includes('Dune: Part Two')}
            onToggleSaved={() => toggleSavedMovie('Dune: Part Two')}
          /> */}
          <CatalogToolbar
            genres={genres}
            activeGenre={activeGenre}
            search={search}
            sort={sort}
            onGenreChange={setActiveGenre}
            onSearchChange={setSearch}
            onSortChange={setSort}
          />
          <MovieCatalog
            movies={filteredMovies}
            activeGenre={activeGenre}
            savedMovies={savedMovies}
            posterColors={posterColors}
            isLoading={isLoading}
            error={error}
            onToggleSaved={toggleSavedMovie}
            onOpen={openMovie}
            onPosterLoad={extractPosterColor}
          />
          <footer>
            <span>© 2024 Кадр</span>
            <span>Смотрим внимательнее</span>
          </footer>
        </>
      )}
    </main>
  )
}

export default App
