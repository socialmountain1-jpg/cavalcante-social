'use client'

import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShaderAnimation } from '@/components/ui/shader-lines'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Marcas', 'que', 'as', 'pessoas', 'não', 'conseguem', 'ignorar.']

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })

      tl.from('.hero-word', { yPercent: 120, duration: 1.1, stagger: 0.065 })
        .from(subRef.current, { y: 22, opacity: 0, duration: 1 }, '-=0.6')
        .from(
          Array.from(ctasRef.current?.children ?? []),
          { y: 14, opacity: 0, duration: 0.75, stagger: 0.15 },
          '-=0.55'
        )
        .from(indicatorRef.current, { opacity: 0, duration: 0.7 }, '-=0.2')

      gsap.fromTo(
        lineRef.current,
        { yPercent: -100 },
        { yPercent: 100, duration: 1.8, repeat: -1, ease: 'expo.inOut', delay: 3.2 }
      )

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
      style={{ backgroundColor: '#060D1F' }}
    >
      {/* ShaderAnimation — sole background */}
      <ShaderAnimation />

      {/* Dark overlay — improves text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      />

      {/* CSS vignette — darkens corners only, centre and centre-bottom stay clear */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 75% at 50% 42%, transparent 35%, rgba(6,13,31,0.72) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-8 text-center md:px-20">

        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
          Cavalcante Social Mídia
        </p>

        <h1 className="mb-8 text-5xl font-bold leading-[1.07] tracking-tight text-[#F9FAFB] md:text-7xl lg:text-8xl">
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[3px] align-bottom">
                <span className={`hero-word inline-block${word === 'ignorar.' ? ' text-[#60A5FA]' : ''}`}>
                  {word}
                </span>
              </span>
              {i < WORDS.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-12 max-w-[560px] text-lg leading-relaxed text-[#F9FAFB]/70 md:text-[19px]"
        >
          Social Media, Design, Sites e Mentoria —{' '}
          <span className="font-medium text-[#F9FAFB]">feito com estratégia</span>,{' '}
          entregue com obsessão.
        </p>

        <div
          ref={ctasRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://wa.me/5569992142406"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#1D4ED8] px-8 py-4 text-sm font-semibold text-[#F9FAFB] transition-all duration-700 hover:bg-[#1e40af] hover:shadow-[0_8px_32px_rgba(29,78,216,0.5)]"
          >
            <WhatsAppIcon />
            Fala comigo no WhatsApp
          </a>
          <a
            href="#servicos"
            className="rounded-full border border-[#F9FAFB]/25 px-8 py-4 text-sm font-semibold text-[#F9FAFB] transition-all duration-700 hover:border-[#60A5FA]/70 hover:bg-[#60A5FA]/8 hover:text-[#60A5FA]"
          >
            Ver meus serviços
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        aria-hidden
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#F9FAFB]/40">scroll</span>
        <div className="relative h-12 w-px overflow-hidden bg-[#64748B]/15">
          <div
            ref={lineRef}
            className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-[#60A5FA] to-transparent"
          />
        </div>
      </div>
    </section>
  )
}
