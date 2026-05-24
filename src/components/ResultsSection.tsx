'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    icon: <HeartIcon />,
    title: 'Atendimento 100% dedicado',
    description: 'Você não é mais um cliente na fila. É o foco total — com atenção, tempo e energia que o seu negócio merece.',
  },
  {
    icon: <SparkIcon />,
    title: 'Estratégia do zero',
    description: 'Sem template, sem copy-paste. Cada estratégia é construída do zero, pensada pra você, pro seu nicho, pro seu momento.',
  },
  {
    icon: <ChartIcon />,
    title: 'Acompanhamento real',
    description: 'Você vê cada resultado, cada métrica, cada avanço. Sem relatório bonito pra esconder o que não funciona.',
  },
]

export default function ResultsSection() {
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

      tl.from('.case-eyebrow',  { y: 20, opacity: 0, duration: 0.7, ease: 'expo.out' })
        .from('.case-headline', { y: 40, opacity: 0, duration: 1,   ease: 'power3.out' }, '-=0.4')
        .from('.case-sub',      { y: 24, opacity: 0, duration: 0.9, ease: 'expo.out'  }, '-=0.5')
        .from('.case-card',     { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.14 }, '-=0.5')
        .from('.case-cta',      { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out'  }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-[#0F172A]">
      <div className="mx-auto max-w-[1400px] px-8 py-[120px] md:px-20">

        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="case-eyebrow mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
            Cases
          </p>

          <h2
            className="case-headline mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #93C5FD 50%, #ffffff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            O próximo case de sucesso pode ser o seu.
          </h2>

          <p className="case-sub max-w-xl text-base leading-relaxed text-[#64748B] md:text-lg">
            Ainda estou construindo minha história —{' '}
            <span className="font-medium text-white/80">e quero construir a sua junto.</span>
          </p>
        </div>

        {/* 3 Cards */}
        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map(({ icon, title, description }) => (
            <div
              key={title}
              className="case-card group flex flex-col gap-5 rounded-2xl p-8 transition-all duration-500 hover:border-[#60A5FA]/25 md:p-10"
              style={{
                background: 'linear-gradient(145deg, #0d1a2e 0%, #0a1220 100%)',
                border: '1px solid rgba(96,165,250,0.1)',
              }}
            >
              {/* Icon */}
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-500 group-hover:bg-[#1D4ED8]/30"
                style={{ background: 'rgba(29,78,216,0.15)' }}
              >
                {icon}
              </div>

              {/* Text */}
              <div>
                <p className="mb-3 text-lg font-bold text-white">{title}</p>
                <p className="text-sm leading-relaxed text-[#64748B]">{description}</p>
              </div>

              {/* Bottom accent line */}
              <div
                className="mt-auto h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, #60A5FA, #1D4ED8)' }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="case-cta flex justify-center">
          <a
            href="https://wa.me/5569992142406"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] px-10 py-5 text-base font-bold text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition-all duration-500 hover:scale-[1.04] hover:bg-[#1ebe59] hover:shadow-[0_16px_48px_rgba(37,211,102,0.4)]"
            style={{ borderRadius: '100px' }}
          >
            <WhatsAppIcon />
            Quero ser um case de sucesso
          </a>
        </div>

      </div>
    </section>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.81 3.89 12 5C12.19 3.89 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z" stroke="#60A5FA" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L13.5 9H21L15 13.5L17 21L12 17L7 21L9 13.5L3 9H10.5L12 2Z" stroke="#60A5FA" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 17L9 11L13 15L21 7" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 7H21V11" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}
