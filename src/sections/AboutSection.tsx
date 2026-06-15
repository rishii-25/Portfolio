import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeading from '@/components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '8.35', label: 'CGPA', color: 'text-cyan' },
  { value: '5+', label: 'Projects', color: 'text-cyan' },
  { value: '3', label: 'Research', color: 'text-purple-accent' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const textBlocks = sectionRef.current.querySelectorAll('.animate-text')
    gsap.fromTo(
      textBlocks,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      sectionRef.current.querySelector('.stats-row'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      sectionRef.current.querySelector('.code-block'),
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
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
      id="about"
      ref={sectionRef}
      className="section-padding sm:section-padding"
    >
      <SectionHeading title="About Me" />

      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left Column */}
        <div className="md:w-[60%]">
          {/* Intro Block */}
          <div className="animate-text">
            <p className="text-[17px] font-medium text-text-primary leading-[1.7]">
              I am a third-year EEE student at{' '}
              <span className="relative inline">
                NIT Andhra Pradesh
              </span>
              , exploring the convergence of{' '}
              <span className="relative inline">
                <span className="relative z-10">Machine Learning</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan to-purple-accent" />
              </span>
              , Deep Learning, Computer Vision, and{' '}
              <span className="relative inline">
                <span className="relative z-10">VLSI Design</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan to-purple-accent" />
              </span>
              .
            </p>
          </div>

          {/* Detail Paragraphs */}
          <p className="animate-text mt-5 text-[15px] text-text-secondary leading-[1.7]">
            Currently pursuing a Minor in Artificial Intelligence and Robotics, my academic journey bridges software intelligence with semiconductor hardware. I am a Research Intern at{' '}
            <span className="text-cyan">IIT Bhilai</span>, where I develop deep learning models for image reconstruction and inpainting, exploring convolutional and attention-based architectures.
          </p>

          <p className="animate-text mt-4 text-[15px] text-text-secondary leading-[1.7]">
            My work spans AI-driven battery health prediction, IoT-based adaptive lighting systems, and embedded healthcare devices. I am passionate about building intelligent systems that solve real-world engineering problems while pushing the boundaries of AI integration in next-generation hardware.
          </p>

          {/* Stats Row */}
          <div className="stats-row flex gap-8 mt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className={`text-[20px] font-semibold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs font-mono tracking-wide text-text-tertiary uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Code Block */}
        <div className="code-block md:w-[40%] mt-8 md:mt-10">
          <div className="bg-surface border border-border-custom rounded-2xl p-6 font-mono text-[13px] text-text-secondary leading-relaxed">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-text-tertiary text-xs">skills.json</span>
            </div>
            <div>
              <span className="text-cyan-dim">{'>'}</span>{' '}
              <span className="text-text-secondary">skills.profile</span>
            </div>
            <div className="text-text-tertiary">{'{'}</div>
            <div className="pl-4">
              <span className="text-cyan-dim">domain</span>
              <span className="text-text-tertiary">: </span>
              <span className="text-green-accent">[&quot;ML&quot;, &quot;VLSI&quot;, &quot;Embedded&quot;]</span>
              <span className="text-text-tertiary">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-dim">focus</span>
              <span className="text-text-tertiary">: </span>
              <span className="text-green-accent">&quot;AI + Hardware&quot;</span>
              <span className="text-text-tertiary">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-dim">tools</span>
              <span className="text-text-tertiary">: </span>
              <span className="text-green-accent">[&quot;Python&quot;, &quot;Verilog&quot;, &quot;ESP32&quot;]</span>
              <span className="text-text-tertiary">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-dim">current</span>
              <span className="text-text-tertiary">: </span>
              <span className="text-green-accent">&quot;Research @ IIT Bhilai&quot;</span>
            </div>
            <div className="text-text-tertiary">{'}'}</div>
            <div className="mt-2">
              <span className="inline-block w-2 h-3.5 bg-cyan animate-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
