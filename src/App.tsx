import { useMemo, useState } from 'react'
import './App.css'

type Movie = {
	title: string
	year: number
	genre: string
	runtime: string
	rating: number
	description: string
	poster: string
	accent: string
}

const movies: Movie[] = [
	{ title: 'The Grand Budapest Hotel', year: 2014, genre: 'Комедия', runtime: '1ч 39м', rating: 8.1, description: 'Приключения легендарного консьержа и его юного протеже в сердце старой Европы.', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85', accent: '#e4a853' },
	{ title: 'Dune: Part Two', year: 2024, genre: 'Фантастика', runtime: '2ч 46м', rating: 8.7, description: 'Пол Атрейдес объединяется с Чани и фременами на пути к возмездию.', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=85', accent: '#c77638' },
	{ title: 'Past Lives', year: 2023, genre: 'Драма', runtime: '1ч 46м', rating: 7.8, description: 'Двое друзей детства встречаются спустя годы, чтобы поговорить о выборе и времени.', poster: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=700&q=85', accent: '#9b6f5d' },
	{ title: 'The Holdovers', year: 2023, genre: 'Комедия', runtime: '2ч 13м', rating: 8.0, description: 'Необычная компания остается в школе на зимние каникулы и находит общий язык.', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=85', accent: '#879c91' },
	{ title: 'Anatomy of a Fall', year: 2023, genre: 'Триллер', runtime: '2ч 31м', rating: 7.7, description: 'Суд исследует загадочную смерть писателя и хрупкую правду семейной жизни.', poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85', accent: '#6b777d' },
	{ title: 'Perfect Days', year: 2023, genre: 'Драма', runtime: '2ч 4м', rating: 7.9, description: 'Тихая история человека, который находит красоту в простом ритме каждого дня.', poster: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85', accent: '#6f8d85' },
]

const genres = ['Все фильмы', 'Драма', 'Комедия', 'Фантастика', 'Триллер']

function App() {
	const [activeGenre, setActiveGenre] = useState('Все фильмы')
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('popular')

	const filteredMovies = useMemo(() => {
		const query = search.toLowerCase().trim()
		const result = movies.filter((movie) => {
			const matchesGenre = activeGenre === 'Все фильмы' || movie.genre === activeGenre
			return matchesGenre && (!query || movie.title.toLowerCase().includes(query))
		})
		return [...result].sort((first, second) => sort === 'newest' ? second.year - first.year : second.rating - first.rating)
	}, [activeGenre, search, sort])

	return (
		<main className="app-shell">
			<header className="topbar">
				<a className="brand" href="/" aria-label="Кадр, на главную"><span className="brand-mark">К</span><span>кадр</span></a>
				<nav className="main-nav" aria-label="Основная навигация"><a className="active" href="#movies">Фильмы</a><a href="#watchlist">Мой список <span className="nav-count">3</span></a></nav>
				<button className="profile-button" type="button" aria-label="Открыть профиль">АК</button>
			</header>

			<section className="intro" id="movies"><div><p className="eyebrow">Кураторская подборка</p><h1>Хорошее кино<br /><em>на сегодня.</em></h1></div><p className="intro-note">Фильмы, которые хочется<br />обсуждать после титров.</p></section>

			<section className="toolbar" aria-label="Управление каталогом">
				<div className="genre-tabs" role="tablist" aria-label="Жанры">{genres.map((genre) => <button key={genre} className={activeGenre === genre ? 'selected' : ''} type="button" onClick={() => setActiveGenre(genre)}>{genre}</button>)}</div>
				<div className="toolbar-actions"><label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Найти фильм" aria-label="Найти фильм" /></label><label className="sort-box"><span>Сортировка</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Сортировка фильмов"><option value="popular">Популярные</option><option value="newest">Новые</option><option value="rating">По рейтингу</option></select></label></div>
			</section>

			<section className="catalog" aria-live="polite"><div className="catalog-heading"><h2>{activeGenre === 'Все фильмы' ? 'Все фильмы' : activeGenre}</h2><span>{filteredMovies.length} фильма</span></div>{filteredMovies.length ? <div className="movie-grid">{filteredMovies.map((movie, index) => <article className="movie-card" key={movie.title} style={{ '--accent': movie.accent, '--delay': `${index * 70}ms` } as React.CSSProperties}><div className="poster-wrap"><img src={movie.poster} alt={`Постер фильма «${movie.title}»`} /><button className="save-button" type="button" aria-label={`Добавить «${movie.title}» в мой список`}>+</button><span className="rating"><b>★</b> {movie.rating.toFixed(1)}</span></div><div className="movie-info"><div className="movie-meta"><span>{movie.genre}</span><i /><span>{movie.year}</span><i /><span>{movie.runtime}</span></div><h3>{movie.title}</h3><p>{movie.description}</p></div></article>)}</div> : <div className="empty-state"><span>⌕</span><h3>Фильм не найден</h3><p>Попробуйте изменить запрос или выбрать другой жанр.</p></div>}</section>
			<footer><span>© 2024 Кадр</span><span>Смотрим внимательнее</span></footer>
		</main>
	)
}

export default App
