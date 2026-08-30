import { useState } from 'react'
import type { SyntheticEvent } from 'react'

export function usePosterColors() {
  const [posterColors, setPosterColors] = useState<Record<string, string>>({})

  const extractPosterColor = (event: SyntheticEvent<HTMLImageElement>, title: string) => {
    const image = event.currentTarget
    const canvas = document.createElement('canvas')
    canvas.width = 12
    canvas.height = 12
    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    let pixels: Uint8ClampedArray
    try {
      pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    } catch {
      return
    }
    const buckets = new Map<
      string,
      { count: number; red: number; green: number; blue: number }
    >()

    for (let index = 0; index < pixels.length; index += 4) {
      const red = Math.round(pixels[index] / 32) * 32
      const green = Math.round(pixels[index + 1] / 32) * 32
      const blue = Math.round(pixels[index + 2] / 32) * 32
      const key = `${red}-${green}-${blue}`
      const bucket = buckets.get(key) ?? { count: 0, red, green, blue }
      bucket.count += 1
      buckets.set(key, bucket)
    }

    const dominant = [...buckets.values()].sort(
      (first, second) => second.count - first.count,
    )[0]
    if (!dominant) return

    const color = `rgb(${dominant.red}, ${dominant.green}, ${dominant.blue})`
    setPosterColors((current) =>
      current[title] === color ? current : { ...current, [title]: color },
    )
  }

  return { posterColors, extractPosterColor }
}
