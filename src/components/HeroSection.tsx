'use client'

import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Marcas', 'que', 'as', 'pessoas', 'não', 'conseguem', 'ignorar.']

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const shapeRef     = useRef<SVGSVGElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entry reveal ──────────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })

      tl.from('.hero-word', { yPercent: 120, duration: 1.1, stagger: 0.065 })
        .from(subRef.current, { y: 22, opacity: 0, duration: 1 }, '-=0.6')
        .from(
          Array.from(ctasRef.current?.children ?? []),
          { y: 14, opacity: 0, duration: 0.75, stagger: 0.15 },
          '-=0.55'
        )
        .from(indicatorRef.current, { opacity: 0, duration: 0.7 }, '-=0.2')

      // ── Shape: slow rotation + breathe ───────────────────────────────────
      gsap.to(shapeRef.current, {
        rotate: 360,
        duration: 90,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
      gsap.to(shapeRef.current, {
        scale: 1.045,
        y: -14,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power3.inOut',
      })

      // ── Scroll line: sliding flash ────────────────────────────────────────
      gsap.fromTo(
        lineRef.current,
        { yPercent: -100 },
        { yPercent: 100, duration: 1.8, repeat: -1, ease: 'expo.inOut', delay: 3.2 }
      )

      // ── Indicator: fades on first scroll ─────────────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '22% top',
        onUpdate(self) {
          gsap.set(indicatorRef.current, {
            opacity: Math.max(0, 1 - self.progress * 5),
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0F172A' }}
    >
      {/* ── Background image ──────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="ken-burns pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpeg')" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#0F172A]/70" />

      {/* ── Abstract geometric shape ──────────────────────────────────────── */}
      <svg
        ref={shapeRef}
        aria-hidden
        className="pointer-events-none absolute -right-[15vw] -top-[15vw] w-[72vw] max-w-[820px] opacity-[0.17] md:opacity-[0.22]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="250,20 449,135 449,365 250,480 51,365 51,135"   stroke="#60A5FA" strokeWidth="1.5" fill="none" />
        <polygon points="250,65 410,158 410,342 250,435 90,342 90,158"   stroke="#60A5FA" strokeWidth="1"   fill="#60A5FA" fillOpacity="0.05" />
        <polygon points="250,110 371,180 371,320 250,390 129,320 129,180" stroke="#60A5FA" strokeWidth="0.8" fill="none" />
        <polygon points="250,155 332,202 332,298 250,345 168,298 168,202" stroke="#60A5FA" strokeWidth="0.6" fill="#60A5FA" fillOpacity="0.07" />
        <circle cx="250" cy="250" r="95"  stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="3 8"  fill="none" />
        <circle cx="250" cy="250" r="168" stroke="#60A5FA" strokeWidth="0.4" strokeDasharray="2 14" fill="none" />
        <circle cx="250" cy="250" r="5"   fill="#60A5FA" fillOpacity="0.45" />
      </svg>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-8 text-center md:px-20">

        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
          Cavalcante Social Mídia
        </p>

        <h1 className="mb-8 text-5xl font-bold leading-[1.07] tracking-tight text-white md:text-7xl lg:text-8xl">
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[3px] align-bottom">
                <span className={`hero-word inline-block${word === 'ignorar.' ? ' text-[#1D4ED8]' : ''}`}>
                  {word}
                </span>
              </span>
              {i < WORDS.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-12 max-w-[560px] text-lg leading-relaxed text-white/70 md:text-[19px]"
        >
          Social Media, Design, Sites e Mentoria —{' '}
          <span className="font-medium text-white">feito com estratégia</span>,{' '}
          entregue com obsessão.
        </p>

        <div
          ref={ctasRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#trabalho"
            className="rounded-full bg-[#1D4ED8] px-8 py-4 text-sm font-semibold text-white transition-all duration-700 hover:bg-[#1e40af] hover:shadow-[0_8px_32px_rgba(29,78,216,0.35)]"
          >
            Ver meu trabalho
          </a>
          <a
            href="#contato"
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-700 hover:border-white/50 hover:text-white"
          >
            Fala comigo
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div
        ref={indicatorRef}
        aria-hidden
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">scroll</span>
        <div className="relative h-12 w-px overflow-hidden bg-[#64748B]/15">
          <div
            ref={lineRef}
            className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-[#1D4ED8] to-transparent"
          />
        </div>
      </div>
    </section>
  )
}
