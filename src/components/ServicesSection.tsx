'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    number: '01',
    title: 'Social Media',
    description:
      'Estratégia, conteúdo e gestão de redes para marcas que querem presença real — não só número de seguidores.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Identidade visual que comunica autoridade antes de qualquer palavra ser lida.',
  },
  {
    number: '03',
    title: 'Criação de Sites',
    description:
      'Sites que convertem — rápidos, bonitos e construídos para o objetivo certo.',
  },
  {
    number: '04',
    title: 'Mentoria',
    description:
      'Aceleração para quem quer viver de comunicação digital sem perder tempo com o que não funciona.',
  },
] as const

type Service = (typeof SERVICES)[number]

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ number, title, description }: Service) {
  return (
    <article
      className="
        service-card group relative flex flex-col justify-between
        overflow-hidden rounded-2xl
        bg-gradient-to-br from-[#1D4ED8] to-[#1e3a8a]
        p-10 md:p-12
        min-h-[400px] w-full
        md:h-[540px] md:w-[400px] md:flex-shrink-0
        transition-all duration-700
        hover:shadow-[0_0_0_1px_rgba(96,165,250,0.5),0_0_60px_rgba(96,165,250,0.25),0_24px_80px_rgba(13,8,8,0.7)]
        cursor-default
      "
    >
      {/* Electric glow overlay — radial light from top-left on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(96,165,250,0.2),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Giant decorative number in background */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-4 select-none font-black leading-none text-[#F9FAFB]/[0.05] transition-colors duration-700 group-hover:text-[#F9FAFB]/[0.09]"
        style={{ fontSize: 'clamp(140px, 18vw, 210px)' }}
      >
        {number}
      </span>

      {/* ── Top content ────────────────────────────────────────────────────── */}
      <div className="relative flex flex-col gap-7">
        {/* Small number label */}
        <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#F9FAFB]/35">
          {number}
        </span>

        {/* Title */}
        <h3 className="text-[28px] font-black leading-tight tracking-tight text-[#F9FAFB] md:text-[34px]">
          {title}
        </h3>

        {/* Separator */}
        <div className="h-px w-14 bg-[#60A5FA]/50 transition-all duration-700 group-hover:w-20 group-hover:bg-[#60A5FA]" />

        {/* Description */}
        <p className="text-[15px] leading-[1.75] text-[#F9FAFB]/60">
          {description}
        </p>
      </div>

      {/* ── Bottom arrow ───────────────────────────────────────────────────── */}
      <div className="relative mt-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F9FAFB]/35 transition-colors duration-700 group-hover:text-[#F9FAFB]/60">
          Ver serviço
        </span>
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-[#F9FAFB]/20 transition-all duration-700 group-hover:w-14 group-hover:bg-[#60A5FA]/60" />
          <ArrowIcon />
        </div>
      </div>
    </article>
  )
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
      className="text-[#60A5FA] transition-transform duration-700 group-hover:translate-x-1"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // ── Desktop: horizontal camera pan ──────────────────────────────────
    mm.add('(min-width: 768px)', () => {
      const section = sectionRef.current
      const track   = trackRef.current
      if (!section || !track) return

      const panTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          scrub: 1.5,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.94,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            containerAnimation: panTween,
            start: 'left 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.from('.services-title', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })

    // ── Mobile: vertical stacked reveal ─────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      gsap.from('.services-title', {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#060D1F]"
    >
      {/* ── Mobile title ──────────────────────────────────────────────────── */}
      <div className="services-title px-8 pb-8 pt-20 md:hidden">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
          O que fazemos
        </p>
        <h2 className="text-4xl font-bold leading-tight text-[#F9FAFB]">
          Cada serviço,{' '}
          <span className="text-[#60A5FA]">um resultado.</span>
        </h2>
      </div>

      {/* ── Track ─────────────────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="flex will-change-transform
          flex-col gap-5 px-8 pb-20 pt-4
          md:h-screen md:w-max md:flex-row md:items-center md:gap-10 md:px-20 md:pb-0 md:pt-0"
      >
        {/* Desktop title panel */}
        <div className="services-title hidden md:flex md:w-[310px] md:flex-shrink-0 md:flex-col md:gap-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
            O que fazemos
          </p>
          <h2 className="text-[44px] font-black leading-[1.03] tracking-tight text-[#F9FAFB]">
            Cada serviço,
            <br />
            <span className="text-[#60A5FA]">um resultado.</span>
          </h2>
          <div className="h-px w-12 bg-[#F9FAFB]/10" />
          <p className="text-sm leading-relaxed text-[#F9FAFB]/45">
            Escolha o caminho certo — ou combine tudo numa estratégia completa.
          </p>
        </div>

        {/* Vertical separator */}
        <div className="hidden md:block md:h-56 md:w-px md:flex-shrink-0 md:bg-[#60A5FA]/12" />

        {/* Cards */}
        {SERVICES.map((service) => (
          <ServiceCard key={service.number} {...service} />
        ))}

        {/* Right breathing room */}
        <div className="hidden md:block md:w-10 md:flex-shrink-0" />
      </div>
    </section>
  )
}
