import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const filters = ['All', 'ML & AI', 'VLSI', 'Research' , 'IoT','Hardware']

const projects = [
  {
    id: 1,
    image: '/assets/project-inpainting.jpg',
    badge: 'Ongoing Research' as const,
    badgeColor: 'amber' as const,
    title: 'Deep Learning Image Inpainting',
    description:
      'Reconstructing missing and corrupted image regions using advanced CNN and attention-based architectures. Developed in collaboration with IIT Bhilai.',
    tags: [
      { label: 'Python', color: 'purple' as const },
      { label: 'Deep Learning', color: 'purple' as const },
      { label: 'Computer Vision', color: 'purple' as const },
      { label: 'CNN', color: 'cyan' as const },
    ],
    githubUrl: 'https://github.com/rishii-25/Image_Inpainting',
    category: ['ML & AI', 'Research'],
  },
  {
    id: 2,
    image: '/assets/project-inpainting.jpg',
    badge: 'Ongoing Research' as const,
    badgeColor: 'amber' as const,
    title: 'CMOS Delay Predictor',
    description:
      'Developed a physics-informed deep learning framework for 45nm CMOS gate delay prediction by integrating semiconductor physics with PyTorch-based neural networks.',
    tags: [
      { label: 'Python', color: 'purple' as const },
      { label: 'Deep Learning', color: 'purple' as const },
      { label: 'EDA', color: 'purple' as const },
      { label: 'Ngspice', color: 'cyan' as const },
    ],
    githubUrl: 'https://github.com/rishii-25/CMOS-Delay-Predictor',
    category: ['ML & AI', 'Research','VLSI'],
  },
  {
    id: 3,
    image: '/assets/project-battery.jpg',
    badge: 'Completed' as const,
    badgeColor: 'green' as const,
    title: 'EV Battery Health Prediction System',
    description:
      'Integrated ML-based system predicting State of Health (SoH) using anomaly detection, State of Charge estimation, and Remaining Useful Life forecasting for electric vehicle batteries.',
    tags: [
      { label: 'Machine Learning', color: 'purple' as const },
      { label: 'Python', color: 'purple' as const },
      { label: 'Data Analytics', color: 'cyan' as const },
    ],
    githubUrl: 'https://github.com/rishii-25/EV-Battery-Project',
    category: ['ML & AI'],
  },
  {
    id: 4,
    image: '/assets/project-solar.jpg',
    badge: 'Completed' as const,
    badgeColor: 'green' as const,
    title: 'Smart Solar Street Light System',
    description:
      'IoT-based adaptive lighting using ESP32 with traffic-based brightness control, energy monitoring, and intelligent power optimization.',
    tags: [
      { label: 'ESP32', color: 'green' as const },
      { label: 'IoT', color: 'green' as const },
      { label: 'Energy Systems', color: 'green' as const },
    ],
    githubUrl: 'https://github.com/rishii-25/Smart_solar_streetLight',
    category: ['Hardware', 'IoT'],
  },
  {
    id: 5,
    image: '/assets/project-mattress.jpg',
    badge: 'Completed' as const,
    badgeColor: 'green' as const,
    title: 'Smart Mattress Warmer — Embedded Healthcare',
    description:
      'MRI-safe smart heating system with controlled temperature regulation, electrical safety protection, and embedded control for healthcare applications.',
    tags: [
      { label: 'Embedded Systems', color: 'green' as const },
      { label: 'Healthcare', color: 'blue' as const },
      { label: 'IoT', color: 'green' as const },
    ],
    githubUrl: 'https://github.com/rishii-25',
    category: ['Hardware', 'IoT'],
  },
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.project-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  const handleFilter = useCallback((filter: string) => {
    if (filter === activeFilter) return

    const cards = cardsRef.current.filter(Boolean)

    // Animate out non-matching
    gsap.to(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveFilter(filter)
        // Next tick: animate matching in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const updatedCards = cardsRef.current.filter(Boolean)
            gsap.fromTo(
              updatedCards,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            )
          })
        })
      },
    })
  }, [activeFilter])

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter))

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding sm:section-padding"
    >
      <SectionHeading title="Featured Projects" />

      {/* Filter Bar */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`shrink-0 text-[11px] font-mono tracking-wide px-4 py-1.5 rounded-pill border transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-cyan/10 border-cyan text-cyan'
                : 'border-border-custom text-text-secondary hover:border-border-hover'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[idx] = el }}
            className="project-card"
            style={{
              display: filteredProjects.includes(project) ? 'block' : 'none',
            }}
          >
            <ProjectCard
              image={project.image}
              badge={project.badge}
              badgeColor={project.badgeColor}
              title={project.title}
              description={project.description}
              tags={project.tags}
              githubUrl={project.githubUrl}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
