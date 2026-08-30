import { Button } from './ui/button'

type HeroSectionProps = {
  isSaved: boolean
  onToggleSaved: () => void
}

export function HeroSection({ isSaved, onToggleSaved }: HeroSectionProps) {
  return (
    <section className="intro" id="movies">
      <div className="hero-content">
        <p className="eyebrow">Фильм дня</p>
        <h1>Dune: Part Two</h1>
        <div className="hero-meta">
          <span>2024</span>
          <span>16+</span>
          <span>2ч 46м</span>
          <span className="hero-score">★ 8.7</span>
        </div>
        <p className="intro-note">
          Пол Атрейдес объединяется с Чани и фременами на пути к возмездию и судьбе,
          которая ждёт его среди песков Арракиса.
        </p>
        <div className="hero-actions">
          <Button
            className="hero-button hero-button-primary"
            type="button"
            onClick={() => {
              window.location.hash = 'movies'
            }}
          >
            ▶&nbsp; Смотреть
          </Button>
          <Button
            className="hero-button hero-button-secondary"
            variant="secondary"
            type="button"
            onClick={onToggleSaved}
          >
            {isSaved ? '✓ В моём списке' : '+ Мой список'}
          </Button>
        </div>
      </div>
    </section>
  )
}
