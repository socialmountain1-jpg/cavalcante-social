'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLenis } from '@/providers/LenisProvider'

const NAV_LINKS = [
  { label: 'Início',     href: '#inicio'     },
  { label: 'Sobre',      href: '#sobre'      },
  { label: 'Serviços',   href: '#servicos'   },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato',    href: '#contato'    },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const lenis                     = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Stop/start Lenis when mobile menu opens/closes
  useEffect(() => {
    if (menuOpen) lenis.stop()
    else lenis.start()
  }, [menuOpen, lenis])

  const closeMenu = () => setMenuOpen(false)

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#0A0F1E]/90 shadow-[0_1px_0_rgba(96,165,250,0.12)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-20">

          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleAnchor(e, '#inicio')}
            aria-label="Cavalcante Social Mídia"
            className="flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Cavalcante Social Mídia"
              height={40}
              width={160}
              style={{ height: '36px', width: 'auto' }}
              priority
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
                const fallback = img.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'block'
              }}
            />
            <span
              className="font-bold text-[#F9FAFB] text-lg tracking-tight"
              style={{ display: 'none' }}
            >
              Cavalcante<span className="text-[#60A5FA]">.</span>Social
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className="text-sm font-medium text-[#F9FAFB]/60 transition-colors duration-200 hover:text-[#F9FAFB]"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/5569992142406"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-[#F9FAFB] transition-all duration-300 hover:bg-[#1e40af] hover:shadow-[0_4px_20px_rgba(29,78,216,0.5)] md:block"
          >
            Falar no WhatsApp
          </a>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="flex flex-col items-center justify-center gap-[5px] p-2 md:hidden"
          >
            <span
              className={`block h-0.5 w-6 origin-center bg-[#F9FAFB] transition-all duration-300 ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#F9FAFB] transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 origin-center bg-[#F9FAFB] transition-all duration-300 ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>

        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(16px)' }}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleAnchor(e, href)}
              className="text-2xl font-semibold text-[#F9FAFB]/80 transition-colors duration-200 hover:text-[#F9FAFB]"
            >
              {label}
            </a>
          ))}

          <a
            href="https://wa.me/5569992142406"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-4 rounded-full bg-[#1D4ED8] px-8 py-3.5 text-base font-semibold text-[#F9FAFB] transition-all duration-300 hover:bg-[#1e40af]"
          >
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </>
  )
}
