import { useState, useCallback } from 'react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useActiveSection } from '@/hooks/useActiveSection'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = ['about', 'projects', 'experience', 'skills', 'contact']

export default function Navigation() {
  const { direction, pastThreshold } = useScrollDirection(100)
  const activeSection = useActiveSection(sectionIds)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const hidden = pastThreshold && direction === 'down'

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ease-out"
      style={{
        transform: `translateX(-50%) translateY(${hidden ? '-120%' : '0%'})`,
      }}
    >
      <div
        className="flex items-center justify-between gap-6 px-6 py-2.5 rounded-nav max-w-[600px] mx-auto"
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(6, 10, 19, 0.75)',
          border: '1px solid rgba(26, 37, 64, 0.6)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2 text-text-primary font-medium text-[15px]"
        >
          Rishik T.
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-dot-pulse" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-cyan'
                  : 'text-text-secondary hover:text-cyan'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-5 h-px bg-text-primary transition-transform duration-200 ${
              mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-text-primary transition-opacity duration-200 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-text-primary transition-transform duration-200 ${
              mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="sm:hidden mt-2 p-4 rounded-2xl"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(6, 10, 19, 0.95)',
          }}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm font-medium py-1 transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-cyan'
                    : 'text-text-secondary hover:text-cyan'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
