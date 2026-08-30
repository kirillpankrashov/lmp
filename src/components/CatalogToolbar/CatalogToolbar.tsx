import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { SortMode } from '../../lib/movieFilters'
import styles from './CatalogToolbar.module.css'

type CatalogToolbarProps = {
  genres: string[]
  activeGenre: string
  search: string
  sort: SortMode
  onGenreChange: (genre: string) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: SortMode) => void
}

export function CatalogToolbar({
  genres,
  activeGenre,
  search,
  sort,
  onGenreChange,
  onSearchChange,
  onSortChange,
}: CatalogToolbarProps) {
  return (
    <section className={styles.toolbar} aria-label="Управление каталогом">
      <div className={styles.genreTabs} role="tablist" aria-label="Жанры">
        {genres.map((genre) => (
          <button
            key={genre}
            className={activeGenre === genre ? styles.selected : undefined}
            type="button"
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <label className={styles.searchBox}>
          <span aria-hidden="true">⌕</span>
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Найти фильм"
            aria-label="Найти фильм"
          />
        </label>
        <label className={styles.sortBox}>
          <span>Сортировка</span>
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger aria-label="Сортировка фильмов">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="newest">Новые</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>
    </section>
  )
}
