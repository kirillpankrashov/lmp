import type { Movie } from '../types/movie'

export const movies: Movie[] = [
  {
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genre: 'Комедия',
    runtime: '1ч 39м',
    rating: 8.1,
    description:
      'Приключения легендарного консьержа и его юного протеже в сердце старой Европы.',
    poster: './posters/grand-budapest.jpg',
    accent: '#e4a853',
  },
  {
    title: 'Dune: Part Two Dune: Part Two Dune: Part Two Dune: Part Two',
    year: 2024,
    genre: 'Фантастика',
    runtime: '2ч 46м',
    rating: 8.7,
    description: 'Пол Атрейдес объединяется с Чани и фременами на пути к возмездию.',
    poster: './posters/dune.jpg',
    accent: '#c77638',
  },
  {
    title: 'Past Lives',
    year: 2023,
    genre: 'Драма',
    runtime: '1ч 46м',
    rating: 7.8,
    description:
      'Двое друзей детства встречаются спустя годы, чтобы поговорить о выборе и времени.',
    poster: './posters/past-lives.jpg',
    accent: '#9b6f5d',
  },
  {
    title: 'The Holdovers',
    year: 2023,
    genre: 'Комедия',
    runtime: '2ч 13м',
    rating: 8.0,
    description:
      'Необычная компания остается в школе на зимние каникулы и находит общий язык.',
    poster: './posters/holdovers.jpg',
    accent: '#879c91',
  },
  {
    title: 'Anatomy of a Fall',
    year: 2023,
    genre: 'Триллер',
    runtime: '2ч 31м',
    rating: 7.7,
    description:
      'Суд исследует загадочную смерть писателя и хрупкую правду семейной жизни.',
    poster: './posters/anatomy.jpg',
    accent: '#6b777d',
  },
  {
    title: 'Perfect Days',
    year: 2023,
    genre: 'Драма',
    runtime: '2ч 4м',
    rating: 7.9,
    description:
      'Тихая история человека, который находит красоту в простом ритме каждого дня.',
    poster: './posters/perfect-days.jpg',
    accent: '#6f8d85',
  },
]

export const genres = ['Все фильмы', 'Драма', 'Комедия', 'Фантастика', 'Триллер']
