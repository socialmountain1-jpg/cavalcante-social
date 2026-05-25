'use client'

import { createContext, useContext, useMemo, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LenisControl {
  stop: () => void
  start: () => void
}

const LenisContext = createContext<LenisControl>({ stop: () => {}, start: () => {} })

export function useLenis() {
  return useContext(LenisContext)
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
      lenisRef.current = null
    }
  }, [])

  const value = useMemo<LenisControl>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    []
  )

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}
