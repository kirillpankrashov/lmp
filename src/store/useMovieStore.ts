import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getMovies } from '../api/movies'
import type { Movie } from '../types/movie'
import type { SortMode } from '../lib/movieFilters'

type MovieStore = {
  movies: Movie[]
  activeGenre: string
  search: string
  sort: SortMode
  savedMovies: string[]
  isLoading: boolean
  error: string | null
  loadMovies: () => Promise<void>
  setActiveGenre: (genre: string) => void
  setSearch: (search: string) => void
  setSort: (sort: SortMode) => void
  toggleSavedMovie: (title: string) => void
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      movies: [],
      activeGenre: 'Все фильмы',
      search: '',
      sort: 'popular',
      savedMovies: [],
      isLoading: false,
      error: null,
      loadMovies: async () => {
        set({ isLoading: true, error: null })
        try {
          const loadedMovies = await getMovies()
          set({ movies: loadedMovies, isLoading: false })
        } catch {
          set({ isLoading: false, error: 'Не удалось загрузить фильмы' })
        }
      },
      setActiveGenre: (activeGenre) => set({ activeGenre }),
      setSearch: (search) => set({ search }),
      setSort: (sort) => set({ sort }),
      toggleSavedMovie: (title) =>
        set((state) => ({
          savedMovies: state.savedMovies.includes(title)
            ? state.savedMovies.filter((movie) => movie !== title)
            : [...state.savedMovies, title],
        })),
    }),
    {
      name: 'movie-store',
      partialize: (state) => ({ savedMovies: state.savedMovies }),
    },
  ),
)
