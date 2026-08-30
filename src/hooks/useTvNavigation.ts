import { useEffect } from 'react'

const directions: Record<string, 'left' | 'right' | 'up' | 'down'> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down',
}

export function useTvNavigation() {
  useEffect(() => {
    const getFocusable = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), input, select, [tabindex="0"]',
        ),
      )

    const handleRemoteKey = (event: KeyboardEvent) => {
      const key = event.key || ''
      const keyCode = event.keyCode
      if (
        key === 'Escape' ||
        key === 'Backspace' ||
        keyCode === 10009 ||
        keyCode === 461
      ) {
        if (document.activeElement instanceof HTMLInputElement) {
          document.activeElement.blur()
        }
        return
      }

      const direction = directions[key] || directions[String(keyCode)]
      if (!direction) return
      event.preventDefault()
      event.stopPropagation()

      const elements = getFocusable()
      const current = document.activeElement as HTMLElement | null
      const currentIndex = current ? elements.indexOf(current) : -1
      if (currentIndex < 0) {
        elements.find((element) => element.classList.contains('movie-card'))?.focus()
        return
      }

      const currentRect = elements[currentIndex].getBoundingClientRect()
      const horizontal = direction === 'left' || direction === 'right'
      const candidates = elements
        .filter((_, index) => index !== currentIndex)
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => {
          if (direction === 'right') return rect.left >= currentRect.right - 12
          if (direction === 'left') return rect.right <= currentRect.left + 12
          if (direction === 'down') return rect.top >= currentRect.bottom - 12
          return rect.bottom <= currentRect.top + 12
        })
        .sort((first, second) => {
          const primary = horizontal
            ? Math.abs(first.rect.left - currentRect.left) -
              Math.abs(second.rect.left - currentRect.left)
            : Math.abs(first.rect.top - currentRect.top) -
              Math.abs(second.rect.top - currentRect.top)
          const cross = horizontal
            ? Math.abs(first.rect.top - currentRect.top) -
              Math.abs(second.rect.top - currentRect.top)
            : Math.abs(first.rect.left - currentRect.left) -
              Math.abs(second.rect.left - currentRect.left)
          return cross * 3 + primary
        })

      candidates[0]?.element.focus({ preventScroll: true })
      candidates[0]?.element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }

    document.addEventListener('keydown', handleRemoteKey, true)
    return () => document.removeEventListener('keydown', handleRemoteKey, true)
  }, [])
}
