'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookies-accepted')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookies-accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-3rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-[#60A5FA]/15 bg-[#0A0F1E]/95 px-6 py-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[#94a3b8]">
          Este site utiliza cookies essenciais para funcionamento. Ao continuar navegando, você concorda com nossa{' '}
          <Link href="/politica-de-privacidade" className="text-[#60A5FA] underline-offset-2 hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1e40af]"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
