import { describe, expect, it } from 'vitest'
import { movies } from '../data/movies'
import { filterMovies } from './movieFilters'

describe('filterMovies', () => {
  it('filters by genre and search query case-insensitively', () => {
    const result = filterMovies(movies, 'Комедия', 'grand budapest', 'popular')

    expect(result).toHaveLength(1)
    expect(result[0]?.title).toBe('The Grand Budapest Hotel')
  })

  it('sorts filtered movies by newest first', () => {
    const result = filterMovies(movies, 'Драма', '', 'newest')

    expect(result.map((movie) => movie.year)).toEqual([2023, 2023])
    expect(result.map((movie) => movie.title)).toEqual(['Past Lives', 'Perfect Days'])
  })

  it('does not mutate the source array', () => {
    const original = [...movies]

    filterMovies(movies, 'Все фильмы', '', 'rating')

    expect(movies).toEqual(original)
  })

  it('returns an empty list when there are no matches', () => {
    expect(filterMovies(movies, 'Комедия', 'неизвестный фильм', 'popular')).toEqual([])
  })
})
