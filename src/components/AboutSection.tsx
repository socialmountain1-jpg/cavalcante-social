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
  const glowRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.55,
        scale: 1.08,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })

      // Entrance
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
    <section
      ref={sectionRef}
      className="w-full bg-[#0F172A]"
    >
      <div className="mx-auto max-w-[1400px] px-8 py-[120px] md:px-20">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">

          {/* Left — text + differentials */}
          <div className="flex flex-1 flex-col">
            <p className="about-eyebrow mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
              Sobre
            </p>

            <h2 className="about-heading mb-12 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
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
                    <p className="mb-1 font-semibold text-white">{title}</p>
                    <p className="text-sm leading-relaxed text-[#64748B]">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — CSM identity card */}
          <div className="about-card relative flex flex-1 justify-center">
            <div className="relative w-full" style={{ maxWidth: 400 }}>

              {/* Outer ambient glow */}
              <div
                ref={glowRef}
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  inset: '-32px',
                  borderRadius: '40px',
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.22), rgba(29,78,216,0.12) 50%, transparent 75%)',
                  filter: 'blur(24px)',
                  opacity: 0.3,
                }}
              />

              {/* Card — gradient border via background-clip */}
              <div
                className="relative flex flex-col items-center justify-center overflow-hidden"
                style={{
                  aspectRatio: '4 / 5',
                  borderRadius: '24px',
                  padding: '2px',
                  background: 'linear-gradient(135deg, rgba(96,165,250,0.7) 0%, rgba(29,78,216,0.9) 45%, rgba(96,165,250,0.5) 100%)',
                  boxShadow: '0 0 48px rgba(96,165,250,0.12), 0 0 100px rgba(29,78,216,0.08)',
                }}
              >
                {/* Inner dark surface */}
                <div
                  className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
                  style={{
                    borderRadius: '22px',
                    background: 'linear-gradient(160deg, #080f1f 0%, #040a14 100%)',
                  }}
                >
                  {/* Decorative concentric rings */}
                  {[260, 190, 126].map((size, i) => (
                    <span
                      key={size}
                      aria-hidden
                      className="pointer-events-none absolute rounded-full"
                      style={{
                        width: size,
                        height: size,
                        border: `1px solid rgba(96,165,250,${0.06 + i * 0.04})`,
                      }}
                    />
                  ))}

                  {/* Inner radial glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(29,78,216,0.18), transparent)',
                    }}
                  />

                  {/* CSM monogram */}
                  <p
                    className="relative z-10 select-none font-bold leading-none"
                    style={{
                      fontSize: 'clamp(72px, 15vw, 96px)',
                      letterSpacing: '-4px',
                      background: 'linear-gradient(135deg, #bfdbfe 0%, #60A5FA 40%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    CSM
                  </p>

                  {/* Thin divider */}
                  <div
                    aria-hidden
                    className="relative z-10 my-4"
                    style={{
                      width: 48,
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.55), transparent)',
                    }}
                  />

                  {/* Label */}
                  <p
                    className="relative z-10 select-none text-[10px] font-semibold uppercase tracking-[0.32em]"
                    style={{ color: 'rgba(96,165,250,0.45)' }}
                  >
                    Social Mídia
                  </p>

                  {/* Corner accents */}
                  {[
                    'left-5 top-5 border-l-2 border-t-2 rounded-tl',
                    'right-5 top-5 border-r-2 border-t-2 rounded-tr',
                    'left-5 bottom-5 border-l-2 border-b-2 rounded-bl',
                    'right-5 bottom-5 border-r-2 border-b-2 rounded-br',
                  ].map((cls) => (
                    <span
                      key={cls}
                      aria-hidden
                      className={`pointer-events-none absolute h-5 w-5 border-[#60A5FA]/30 ${cls}`}
                    />
                  ))}
                </div>
              </div>
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
