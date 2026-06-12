import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeading from '@/components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const entries = [
  {
    side: 'right' as const,
    type: 'Research' as const,
    typeColor: 'text-purple-accent',
    date: 'May 2026 – Present',
    title: 'Research Intern — IIT Bhilai',
    description:
      'Developing improved deep learning-based models for realistic image reconstruction and inpainting. Exploring convolutional and attention-based architectures to enhance quality on corrupted or masked image regions.',
  },
  {
    side: 'left' as const,
    type: 'Leadership' as const,
    typeColor: 'text-green-accent',
    date: 'Apr 2025 – Present',
    title: 'Volunteer Assistant — E-Yantra Club, NIT AP',
    description:
      'Coordinated technical events and supported hands-on training sessions. Developed leadership, teamwork, and problem-solving skills through collaborative club activities.',
  },
  {
    side: 'right' as const,
    type: 'Education' as const,
    typeColor: 'text-blue-accent',
    date: '2025 – Present',
    title: 'Minor in Artificial Intelligence & Robotics',
    description:
      'NIT Andhra Pradesh. Bridging software intelligence with hardware engineering through coursework in deep learning, computer vision, and autonomous systems.',
  },
  {
    side: 'left' as const,
    type: 'Education' as const,
    typeColor: 'text-blue-accent',
    date: '2024 – Present',
    title: 'B.Tech in Electrical & Electronics Engineering',
    description:
      'National Institute of Technology Andhra Pradesh. CGPA: 8.35/10. Focus on circuits, semiconductor systems, VLSI design, and machine learning applications.',
  },

]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Timeline line draw
    const line = sectionRef.current.querySelector('.timeline-line')
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Nodes pop in
    const nodes = sectionRef.current.querySelectorAll('.timeline-node')
    gsap.fromTo(
      nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Content blocks slide in
    const blocks = sectionRef.current.querySelectorAll('.timeline-block')
    blocks.forEach((block, i) => {
      const isLeft = entries[i]?.side === 'left'
      gsap.fromTo(
        block,
        { opacity: 0, x: isLeft ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.3 + i * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding sm:section-padding"
    >
      <SectionHeading title="Experience & Education" />

      <div className="relative mt-10">
        {/* Timeline Line - Desktop center, Mobile left */}
        <div
          className="timeline-line absolute top-0 bottom-0 w-0.5 left-5 sm:left-1/2 sm:-translate-x-px"
          style={{
            background: 'linear-gradient(to bottom, #00D4FF, #7B61FF, transparent)',
            transformOrigin: 'top',
          }}
        />

        {/* Entries */}
        <div className="space-y-12">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className={`relative flex items-start ${
                entry.side === 'left'
                  ? 'sm:flex-row-reverse'
                  : ''
              }`}
            >
              {/* Timeline Node */}
              <div
                className={`timeline-node absolute top-2 w-3 h-3 rounded-full border-2 border-cyan bg-bg-dark z-10 left-5 sm:left-1/2 -translate-x-1/2 animate-node-timeline`}
              />

              {/* Connector Line */}
              <div
                className={`hidden sm:block absolute top-3 h-px w-10 bg-border-custom ${
                  entry.side === 'left' ? 'right-1/2 mr-1.5' : 'left-1/2 ml-1.5'
                }`}
              />

              {/* Content Block */}
              <div
                className={`timeline-block ml-12 sm:ml-0 sm:w-[45%] ${
                  entry.side === 'left' ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                }`}
              >
                <div className="bg-surface border border-border-custom rounded-2xl p-6 max-w-[420px]">
                  {/* Type */}
                  <span
                    className={`text-[11px] font-mono tracking-wide uppercase ${entry.typeColor}`}
                  >
                    {entry.type}
                  </span>

                  {/* Date */}
                  <div className="mt-2 inline-block text-xs font-mono tracking-wide text-cyan bg-cyan/8 px-3 py-1 rounded-pill">
                    {entry.date}
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-[17px] font-medium text-text-primary tracking-[-0.01em]">
                    {entry.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-text-secondary leading-[1.6]">
                    {entry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
