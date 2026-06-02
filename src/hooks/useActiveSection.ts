import { useState, useEffect, useRef } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    observersRef.current.forEach(obs => obs.disconnect())
    observersRef.current = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )

      observer.observe(el)
      observersRef.current.push(observer)
    })

    return () => {
      observersRef.current.forEach(obs => obs.disconnect())
    }
  }, [sectionIds])

  return activeSection
}
