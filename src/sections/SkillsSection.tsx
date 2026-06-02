import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeading from '@/components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    icon: '<>',
    iconBg: 'bg-cyan/12',
    iconColor: 'text-cyan',
    title: 'Programming',
    tagClass: 'tag-cyan',
    skills: ['Python', 'C', 'MATLAB', 'Verilog HDL'],
  },
  {
    icon: '◈',
    iconBg: 'bg-purple-accent/12',
    iconColor: 'text-purple-accent',
    title: 'Machine Learning',
    tagClass: 'tag-purple',
    skills: ['Scikit-Learn', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'Image Processing'],
  },
  {
    icon: '▣',
    iconBg: 'bg-green-accent/12',
    iconColor: 'text-green-accent',
    title: 'Hardware & Embedded',
    tagClass: 'tag-green',
    skills: ['ESP32', 'Embedded Systems', 'IoT Development', 'Sensor Integration'],
  },
  {
    icon: '◇',
    iconBg: 'bg-cyan/12',
    iconColor: 'text-cyan',
    title: 'VLSI & Electronics',
    tagClass: 'tag-cyan',
    skills: ['Digital Electronics', 'Semiconductor Fundamentals', 'VLSI Design', 'Hardware Design'],
  },
  {
    icon: '◎',
    iconBg: 'bg-blue-accent/12',
    iconColor: 'text-blue-accent',
    title: 'Web Development',
    tagClass: 'tag-blue',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.skill-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding sm:section-padding"
    >
      <SectionHeading title="Technical Skills" />

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="skill-card bg-surface border border-border-custom rounded-2xl p-6 relative overflow-hidden transition-all duration-250 hover:border-border-hover hover:-translate-y-0.5 group"
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-full ${cat.iconBg} ${cat.iconColor} flex items-center justify-center text-sm font-mono font-medium transition-transform duration-250 group-hover:scale-110`}
            >
              {cat.icon}
            </div>

            {/* Title */}
            <h3 className="mt-4 text-[17px] font-medium text-text-primary tracking-[-0.01em]">
              {cat.title}
            </h3>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cat.skills.map((skill) => (
                <span key={skill} className={cat.tagClass}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
