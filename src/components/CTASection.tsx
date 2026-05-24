'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BeforeAfterSlider from './BeforeAfterSlider'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const shapeRef   = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Shape: ambient counter-rotation + breathe ──────────────────────────
      gsap.to(shapeRef.current, {
        rotate: -360, duration: 120, repeat: -1, ease: 'none', transformOrigin: '50% 50%',
      })
      gsap.to(shapeRef.current, {
        scale: 1.06, duration: 12, repeat: -1, yoyo: true, ease: 'power3.inOut',
      })

      // ── Entrance timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      tl.from('.cta-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' })
        .from('.cta-line-1', { y: 36, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
        .from('.cta-line-2', { y: 36, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.65')
        .from('.cta-sub',    { y: 24, opacity: 0, duration: 1, ease: 'expo.out'   }, '-=0.55')
        .from('.cta-button', { y: 18, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=0.5')
        .from('.cta-slider',  { x: 40, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=1.2')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0d2e8a 55%, #1D4ED8 100%)' }}
    >
      {/* Radial depth glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(96,165,250,0.12), transparent)',
        }}
      />

      {/* Decorative shape */}
      <svg
        ref={shapeRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-[22vw] -right-[22vw] w-[60vw] max-w-[680px] opacity-[0.06]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="250,20 449,135 449,365 250,480 51,365 51,135"   stroke="white" strokeWidth="1.5" fill="none" />
        <polygon points="250,65 410,158 410,342 250,435 90,342 90,158"   stroke="white" strokeWidth="1"   fill="white" fillOpacity="0.03" />
        <polygon points="250,110 371,180 371,320 250,390 129,320 129,180" stroke="white" strokeWidth="0.8" fill="none" />
        <circle cx="250" cy="250" r="95"  stroke="white" strokeWidth="0.5" strokeDasharray="3 8"  fill="none" />
        <circle cx="250" cy="250" r="168" stroke="white" strokeWidth="0.4" strokeDasharray="2 14" fill="none" />
      </svg>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-[120px] md:px-20">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">

          {/* Left — text */}
          <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">

            <p className="cta-eyebrow mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Próximo passo
            </p>

            <h2 className="mb-8 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              <span className="cta-line-1 block text-white">
                Cansado de tentar viralizar sua empresa e não conseguir?
              </span>
              <span className="cta-line-2 block text-[#60A5FA]">
                Deixa comigo.
              </span>
            </h2>

            <p className="cta-sub mb-12 max-w-[440px] text-base leading-relaxed text-white/80 md:text-lg">
              Você deveria estar fazendo mais dinheiro — não quebrando a cabeça com algoritmo, post e estratégia.
            </p>

            <a
              href="https://wa.me/5569992142406"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center gap-4 bg-[#25D366] px-10 py-5 text-base font-bold text-white shadow-[0_8px_40px_rgba(37,211,102,0.35)] transition-all duration-500 hover:scale-[1.05] hover:bg-[#1ebe59] hover:shadow-[0_24px_64px_rgba(37,211,102,0.45)]"
              style={{ borderRadius: '100px' }}
            >
              <WhatsAppIcon />
              Quero fazer mais dinheiro
            </a>

          </div>

          {/* Right — before/after slider */}
          <div className="cta-slider w-full lg:flex-1 lg:flex lg:justify-center">
            <BeforeAfterSlider />
          </div>

        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
