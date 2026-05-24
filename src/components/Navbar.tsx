'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Início',     href: '#inicio'     },
  { label: 'Sobre',      href: '#sobre'      },
  { label: 'Serviços',   href: '#servicos'   },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato',    href: '#contato'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0F1E]/90 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4 md:px-20">

        {/* Logo */}
        <a href="#inicio" onClick={(e) => handleAnchor(e, '#inicio')} aria-label="Cavalcante Social Mídia">
          <Image
            src="/logo.png"
            alt="Cavalcante Social Mídia"
            height={40}
            width={160}
            style={{ height: '40px', width: 'auto' }}
            priority
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              const fallback = img.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'block'
            }}
          />
          <span
            className="font-bold text-white text-lg tracking-tight"
            style={{ display: 'none' }}
          >
            Cavalcante<span className="text-[#60A5FA]">.</span>Social
          </span>
        </a>

        {/* Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleAnchor(e, href)}
              className="text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="https://wa.me/5569992142406"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1e40af] hover:shadow-[0_4px_20px_rgba(29,78,216,0.4)]"
        >
          Falar no WhatsApp
        </a>

      </div>
    </header>
  )
}
