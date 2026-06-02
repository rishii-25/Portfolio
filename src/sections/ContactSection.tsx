import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeading from '@/components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'rishik25t4@gmail.com',
    href: 'mailto:rishik25t4@gmail.com',
    hoverColor: 'hover:text-cyan',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: 'github.com/rishii-25',
    href: 'https://github.com/rishii-25',
    hoverColor: 'hover:text-purple-accent',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'linkedin.com/in/rishii25t4',
    href: 'https://linkedin.com/in/rishii25t4',
    hoverColor: 'hover:text-blue-accent',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Andhra Pradesh, India',
    href: '#',
    hoverColor: 'hover:text-green-accent',
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelector('.contact-left'),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      sectionRef.current.querySelector('.contact-right'),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding sm:section-padding"
    >
      <SectionHeading title="Get In Touch" />

      <div className="mt-8 flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left Column */}
        <div className="contact-left md:w-[45%]">
          <h3 className="text-[22px] font-medium text-text-primary leading-[1.5]">
            Let&apos;s build something extraordinary together.
          </h3>
          <p className="mt-3 text-[15px] text-text-secondary">
            I&apos;m always open to research collaborations, internship opportunities, and interesting engineering projects.
          </p>

          {/* Contact Links */}
          <div className="mt-8 space-y-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 text-text-primary hover:bg-surface/60 ${link.hoverColor}`}
              >
                {link.icon}
                <span className="text-[15px]">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="contact-right md:w-[55%]">
          <div className="bg-surface border border-border-custom rounded-2xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-green-accent/15 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-text-primary">Message Sent!</h4>
                <p className="mt-2 text-sm text-text-secondary">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono tracking-wide text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-bg-dark border border-border-custom rounded-lg px-4 py-3 text-text-primary text-[15px] font-sans focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] outline-none transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wide text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bg-dark border border-border-custom rounded-lg px-4 py-3 text-text-primary text-[15px] font-sans focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] outline-none transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wide text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-bg-dark border border-border-custom rounded-lg px-4 py-3 text-text-primary text-[15px] font-sans focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] outline-none transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wide text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-bg-dark border border-border-custom rounded-lg px-4 py-3 text-text-primary text-[15px] font-sans focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] outline-none transition-all duration-200 resize-y min-h-[120px]"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan text-bg-dark font-sans font-semibold text-sm rounded-lg hover:bg-[#33DDFF] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
