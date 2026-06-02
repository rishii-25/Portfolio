import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeading from '@/components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    borderColor: 'border-l-cyan',
    icon: 'flask',
    title: 'IIT Bhilai Research Internship',
    subtitle: 'Image Inpainting using Deep Learning',
    description:
      'Active research on advanced image inpainting techniques at the Indian Institute of Technology Bhilai, developing deep learning models for realistic image reconstruction using CNN and attention-based architectures.',
    badge: 'Active Research',
    badgeClass: 'bg-cyan/10 text-cyan',
  },
  {
    borderColor: 'border-l-purple-accent',
    icon: 'brain',
    title: 'AI & Robotics Minor Degree',
    subtitle: 'NIT Andhra Pradesh',
    description:
      'Pursuing a specialized minor in Artificial Intelligence and Robotics, combining coursework in deep learning, computer vision, and autonomous systems with core electrical engineering.',
    badge: 'In Progress',
    badgeClass: 'bg-purple-accent/10 text-purple-accent',
  },
  {
    borderColor: 'border-l-green-accent',
    icon: 'microchip',
    title: 'ML & VLSI Integration Path',
    subtitle: 'Focused Research Direction',
    description:
      'Independent research trajectory exploring the integration of machine learning algorithms with VLSI design workflows, targeting next-generation semiconductor design automation.',
    badge: 'Exploration',
    badgeClass: 'bg-green-accent/10 text-green-accent',
  },
]

export default function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.achievement-card')
    gsap.fromTo(
      cards,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="research"
      ref={sectionRef}
      className="section-padding sm:section-padding"
    >
      <SectionHeading title="Research & Achievements" />

      <div className="mt-8 space-y-5">
        {achievements.map((item) => (
          <div
            key={item.title}
            className={`achievement-card bg-surface border border-border-custom ${item.borderColor} border-l-[3px] rounded-2xl p-8 relative`}
          >
            {/* Watermark Icon */}
            <div className="absolute top-6 right-6 text-[48px] leading-none text-cyan/[0.04] pointer-events-none select-none">
              {item.icon === 'flask' && (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 3L7 17H17L15 3H9M12 7V13H10V7H12M12 15V17H10V15H12M6 21H18V19H6V21Z" />
                </svg>
              )}
              {item.icon === 'brain' && (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3C9.23 3 6.19 5.95 6 9.66L4.08 12.19C3.84 12.5 4.08 13 4.5 13H6V16C6 17.11 6.89 18 8 18H9V21H15V18H16C17.11 18 18 17.11 18 16V13H19.5C19.92 13 20.16 12.5 19.92 12.19L18 9.66C17.81 5.95 14.77 3 13 3M10 8C9.45 8 9 7.55 9 7S9.45 6 10 6 11 6.45 11 7 10.55 8 10 8M16 7C16 7.55 15.55 8 15 8S14 7.55 14 7 14.45 6 15 6 16 6.45 16 7Z" />
                </svg>
              )}
              {item.icon === 'microchip' && (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4H18V6H21V8H18V10H21V12H18V14H21V16H18V18H21V20H18V22H6V20H3V18H6V16H3V14H6V12H3V10H6V8H3V6H6V4M8 6V18H16V6H8M10 8H14V16H10V8Z" />
                </svg>
              )}
            </div>

            {/* Title */}
            <h3 className="text-[20px] font-medium text-text-primary">{item.title}</h3>

            {/* Subtitle */}
            <p className="mt-1 text-xs font-mono tracking-wide text-cyan">{item.subtitle}</p>

            {/* Description */}
            <p className="mt-3 text-[15px] text-text-secondary leading-[1.6]">
              {item.description}
            </p>

            {/* Badge */}
            <span
              className={`inline-block mt-4 text-[11px] font-mono tracking-wide px-3.5 py-1 rounded-pill ${item.badgeClass}`}
            >
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
