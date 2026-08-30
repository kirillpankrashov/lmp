import { beforeEach, describe, expect, it } from 'vitest'
import { useMovieStore } from './useMovieStore'

beforeEach(() => {
  useMovieStore.setState({ savedMovies: [] })
})

describe('useMovieStore saved movies', () => {
  it('adds and removes a movie from the watchlist', () => {
    useMovieStore.getState().toggleSavedMovie('Dune: Part Two')
    expect(useMovieStore.getState().savedMovies).toEqual(['Dune: Part Two'])

    useMovieStore.getState().toggleSavedMovie('Dune: Part Two')
    expect(useMovieStore.getState().savedMovies).toEqual([])
  })

  it('keeps other saved movies when one is removed', () => {
    const { toggleSavedMovie } = useMovieStore.getState()
    toggleSavedMovie('Dune: Part Two')
    toggleSavedMovie('Past Lives')
    toggleSavedMovie('Dune: Part Two')

    expect(useMovieStore.getState().savedMovies).toEqual(['Past Lives'])
  })
})
