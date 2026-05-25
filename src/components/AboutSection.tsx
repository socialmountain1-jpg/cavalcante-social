'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DIFFERENTIALS = [
  {
    title: 'Cada cliente é único',
    description: 'Sem pacote engessado. A estratégia é feita do zero pra você — do seu nicho, do seu público, do seu momento.',
  },
  {
    title: 'Você acompanha tudo',
    description: 'Relatórios claros, sem enrolação. Você vê exatamente o que está crescendo, quando e por quê.',
  },
  {
    title: 'Obsessão pela entrega',
    description: 'Cada post, cada campanha, cada site feito como se fosse o meu próprio negócio. Sem descuido.',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      tl.from('.about-eyebrow', { y: 20, opacity: 0, duration: 0.7, ease: 'expo.out' })
        .from('.about-heading', { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .from('.about-item',    { y: 24, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.15 }, '-=0.5')
        .from('.about-card',   { x: 40, opacity: 0, duration: 1,   ease: 'power3.out' }, '-=0.9')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-[#060D1F]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-20 md:py-[120px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">

          {/* Left — text + differentials */}
          <div className="flex flex-1 flex-col">
            <p className="about-eyebrow mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
              Sobre
            </p>

            <h2 className="about-heading mb-12 text-4xl font-bold leading-[1.1] tracking-tight text-[#F9FAFB] md:text-5xl">
              A maioria posta.{' '}
              <span className="text-[#60A5FA]">Eu construo presença.</span>
            </h2>

            <ul className="flex flex-col gap-8">
              {DIFFERENTIALS.map(({ title, description }) => (
                <li key={title} className="about-item flex items-start gap-4">
                  <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8]">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="mb-1 font-semibold text-[#F9FAFB]">{title}</p>
                    <p className="text-sm leading-relaxed text-[#64748B]">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — phrase card */}
          <div className="about-card relative flex flex-1 justify-center">
            <div
              className="relative flex w-full flex-col items-center justify-center overflow-hidden"
              style={{
                maxWidth: 440,
                aspectRatio: '4 / 5',
                borderRadius: '28px',
                background: 'linear-gradient(160deg, #080f1f 0%, #060D1F 60%, #040a14 100%)',
                border: '1px solid rgba(96,165,250,0.18)',
                boxShadow: '0 0 80px rgba(29,78,216,0.25), inset 0 0 60px rgba(29,78,216,0.06)',
              }}
            >
              {/* Subtle radial glow behind text */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(29,78,216,0.35), transparent 70%)',
                }}
              />

              {/* Phrase */}
              <p
                className="relative z-10 select-none px-10 text-center font-bold leading-[1.15] tracking-tight text-[#F9FAFB]"
                style={{ fontSize: 'clamp(26px, 4.5vw, 38px)' }}
              >
                Cada projeto recebe
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #bfdbfe 0%, #60A5FA 50%, #1e40af 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  o melhor de mim.
                </span>
              </p>

              {/* Thin divider below */}
              <div
                aria-hidden
                className="relative z-10 mt-8"
                style={{
                  width: 56,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
