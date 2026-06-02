import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(threshold = 100) {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [pastThreshold, setPastThreshold] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setPastThreshold(currentScrollY > threshold)

      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return

      if (currentScrollY > lastScrollY.current) {
        setDirection('down')
      } else {
        setDirection('up')
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { direction, pastThreshold }
}
