import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeadingProps {
  title: string
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ref })

  return (
    <div ref={ref} className="flex items-center gap-4 mb-8">
      <h2 className="text-[13px] font-sans font-bold uppercase tracking-[0.12em] text-text-secondary">
        {title}
      </h2>
      <div className="flex items-center gap-1 flex-1">
        <div className="h-px bg-border-custom flex-1 max-w-[60px]" />
        <div className="w-1 h-1 rounded-full bg-cyan" />
      </div>
    </div>
  )
}
