import NeuralNetworkBackground from '@/components/NeuralNetworkBackground'

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center" style={{ paddingTop: '16vh' }}>
        {/* Profile Image */}
        <div className="relative mb-6">
          {/* Rotating ring */}
          <div
            className="absolute -inset-[6px] rounded-full border border-cyan/15 animate-rotate-slow"
          />
          <div
            className="w-[140px] h-[140px] rounded-full overflow-hidden border-[3px] border-cyan/30"
            style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)' }}
          >
            <img
              src="/assets/profile.jpg"
              alt="Rishik Thammisety"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1
          className="text-[36px] sm:text-[56px] font-sans font-semibold text-text-primary tracking-[-0.03em] leading-tight"
          style={{ textShadow: '0 0 40px rgba(0, 212, 255, 0.15)' }}
        >
          RISHIK THAMMISETTY
        </h1>

        {/* Role */}
        <p className="mt-2 text-xs font-mono font-medium uppercase tracking-[0.06em] text-text-secondary">
          Electrical &amp; Electronics Engineering | NIT Andhra Pradesh
        </p>

        {/* Tagline */}
        <p className="mt-6 max-w-[560px] text-[15px] text-text-secondary leading-[1.7]">
          Building intelligent systems at the intersection of Artificial Intelligence, VLSI Design, Embedded Systems, and Semiconductor Technologies.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleScrollTo('#projects')}
            className="px-7 py-3 bg-cyan text-bg-dark font-sans font-semibold text-sm rounded-button hover:bg-[#33DDFF] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:-translate-y-px transition-all duration-200"
          >
            View My Work
          </button>
          <a
            href="/assets/Resume_Rishik123.pdf"
            download
            className="px-7 py-3 bg-transparent border border-border-custom text-text-primary font-sans font-semibold text-sm rounded-button hover:border-cyan hover:text-cyan transition-all duration-200"
          >
            Download Resume
          </a>
        </div>

        {/* Social Links Row */}
        <div className="mt-6 flex items-center gap-5">
          <a
            href="https://github.com/rishii-25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-cyan transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/rishii25t4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-cyan transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:rishik25t4@gmail.com"
            className="text-text-secondary hover:text-cyan transition-colors duration-200"
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <div className="relative w-px h-8 bg-gradient-to-b from-cyan to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan animate-scroll-pulse" />
        </div>
      </div>
    </section>
  )
}
