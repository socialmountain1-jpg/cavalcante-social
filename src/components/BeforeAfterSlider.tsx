'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ── Before panel ───────────────────────────────────────────────────────────────

function BeforePanel() {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ background: '#181818', fontFamily: 'system-ui,sans-serif', color: '#fff' }}
    >
      {/* Logo area */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          background: '#222', borderRadius: 8, padding: '9px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 4, background: '#2e2e2e',
            border: '1px solid #333', flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4a4a4a', letterSpacing: '-0.2px' }}>
            Empresa XYZ
          </span>
        </div>
      </div>

      {/* Instagram section */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>

        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%', background: '#252525',
            border: '1px dashed #333', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#3a3a3a" strokeWidth="1.5" />
              <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: '#444' }}>@empresa.xyz</div>
            <div style={{ fontSize: 9, color: '#2e2e2e', marginTop: 2 }}>sem propósito definido</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14 }}>
          {[['8','posts'],['127','seguidores'],['38','seguindo']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: '#4a4a4a' }}>{n}</div>
              <div style={{ fontSize: 8.5, color: '#2e2e2e', marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Feed grid — random, no pattern */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {['#1c1c1c','#232323','#191919','#202020','#272727','#1a1a1a'].map((bg, i) => (
            <div key={i} style={{ aspectRatio: '1', background: bg, borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* 404 */}
      <div style={{
        margin: '0 16px 10px',
        background: '#1a1a1a', borderRadius: 8, padding: '10px 12px',
        border: '1px solid #252525',
      }}>
        <div style={{ fontSize: 8.5, color: '#333', marginBottom: 4 }}>empresa.com.br</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: '#2e2e2e', lineHeight: 1 }}>404</div>
        <div style={{ fontSize: 9, color: '#2a2a2a', marginTop: 3 }}>Página não encontrada</div>
      </div>

      {/* Label */}
      <div style={{
        padding: '10px 16px 14px', textAlign: 'center',
        fontSize: 9, fontWeight: 700, color: '#333',
        textTransform: 'uppercase', letterSpacing: '0.18em',
      }}>
        Passa despercebido todo dia
      </div>
    </div>
  )
}

// ── After panel ────────────────────────────────────────────────────────────────

function AfterPanel() {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ background: '#060c18', fontFamily: 'system-ui,sans-serif', color: '#fff' }}
    >
      {/* Logo area */}
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid rgba(96,165,250,0.1)',
        background: 'linear-gradient(135deg,rgba(29,78,216,0.2),rgba(96,165,250,0.04))',
      }}>
        <div style={{
          background: 'linear-gradient(135deg,#1D4ED8,#3b82f6)',
          borderRadius: 8, padding: '9px 12px',
          display: 'flex', alignItems: 'center', gap: 9,
          boxShadow: '0 4px 18px rgba(29,78,216,0.45)',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 4,
            background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', flexShrink: 0,
          }}>
            CSM
          </div>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
              Cavalcante Social
            </div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>
              Social Media · Design · Sites
            </div>
          </div>
        </div>
      </div>

      {/* Instagram section */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>

        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
            padding: 2,
            background: 'linear-gradient(135deg,#f9a825,#e91e63,#9c27b0,#60A5FA)',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'linear-gradient(135deg,#1D4ED8,#60A5FA)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 17, color: '#fff',
            }}>C</div>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#fff' }}>
              @cavalcante.social{' '}
              <span style={{ fontSize: 9, color: '#60A5FA' }}>✓</span>
            </div>
            <div style={{ fontSize: 9, color: 'rgba(96,165,250,0.75)', marginTop: 2 }}>
              🚀 Gestão · Design · Sites
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14 }}>
          {[['48','posts'],['12,4K','seguidores'],['890','seguindo']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: '#fff' }}>{n}</div>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Feed grid — organized, consistent identity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {[
            ['#1D4ED8','#7C3AED'],['#0c1a3a','#1D4ED8'],['#7C3AED','#EC4899'],
            ['#1D4ED8','#06B6D4'],['#EC4899','#7C3AED'],['#0F172A','#60A5FA'],
          ].map(([from, to], i) => (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 2,
              background: `linear-gradient(135deg,${from},${to})`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-end', justifyContent: 'flex-end',
              padding: 3,
            }}>
              <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
                ♥ {[847,1200,3400,920,2100,680][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Website preview */}
      <div style={{
        margin: '0 16px 10px',
        background: 'rgba(29,78,216,0.12)',
        borderRadius: 8, padding: '10px 12px',
        border: '1px solid rgba(96,165,250,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#25D366', flexShrink: 0 }} />
          <span style={{ fontSize: 8.5, color: '#60A5FA', fontWeight: 600 }}>cavalcante.social</span>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto' }}>
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
              stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{
          height: 5, borderRadius: 3, marginBottom: 6,
          background: 'linear-gradient(90deg,#1D4ED8,#60A5FA,#7C3AED)',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, width: '75%' }} />
          <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, width: '55%' }} />
          <div style={{ height: 3, background: 'rgba(96,165,250,0.25)', borderRadius: 2, width: '40%', marginTop: 2 }} />
        </div>
      </div>

      {/* Label */}
      <div style={{
        padding: '10px 16px 14px', textAlign: 'center',
        fontSize: 9, fontWeight: 700, color: '#60A5FA',
        textTransform: 'uppercase', letterSpacing: '0.18em',
      }}>
        Marca que as pessoas não esquecem
      </div>
    </div>
  )
}

// ── Drag icon ──────────────────────────────────────────────────────────────────

function DragIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 7l-4 5 4 5M16 7l4 5-4 5"
        stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Slider ─────────────────────────────────────────────────────────────────────

export default function BeforeAfterSlider() {
  const [position, setPosition]  = useState(50)
  const containerRef             = useRef<HTMLDivElement>(null)
  const dragging                 = useRef(false)

  const move = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    setPosition(Math.max(4, Math.min(96, ((clientX - left) / width) * 100)))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) move(e.clientX) }
    const onUp   = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [move])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const fn = (e: TouchEvent) => { e.preventDefault(); move(e.touches[0].clientX) }
    el.addEventListener('touchmove', fn, { passive: false })
    return () => el.removeEventListener('touchmove', fn)
  }, [move])

  return (
    <div className="mx-auto w-full select-none" style={{ maxWidth: 310 }}>

      {/* Labels */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 10,
        fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.28)' }}>← Antes</span>
        <span style={{ color: '#60A5FA' }}>Depois →</span>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative cursor-ew-resize overflow-hidden"
        style={{
          aspectRatio: '3/4',
          borderRadius: 20,
          border: '1px solid rgba(96,165,250,0.15)',
          boxShadow: '0 0 48px rgba(96,165,250,0.07)',
        }}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX) }}
        onTouchStart={(e) => move(e.touches[0].clientX)}
      >
        {/* After — full background (right side = after) */}
        <div className="absolute inset-0">
          <AfterPanel />
        </div>

        {/* Before — clipped to left, desaturated */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            filter: 'grayscale(1) brightness(0.65)',
          }}
        >
          <BeforePanel />
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{
            left: `${position}%`,
            width: 2,
            transform: 'translateX(-1px)',
            background: '#60A5FA',
            boxShadow: '0 0 16px rgba(96,165,250,1), 0 0 4px rgba(255,255,255,0.4)',
          }}
        />

        {/* Handle */}
        <div
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            top: '50%', left: `${position}%`,
            transform: 'translate(-50%,-50%)',
            width: 42, height: 42,
            borderRadius: '50%',
            background: '#60A5FA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 3px rgba(96,165,250,0.2), 0 0 28px rgba(96,165,250,0.8)',
            zIndex: 10,
          }}
          onMouseDown={(e) => { e.stopPropagation(); dragging.current = true }}
        >
          <DragIcon />
        </div>
      </div>

      {/* Caption */}
      <p style={{
        marginTop: 14, textAlign: 'center',
        fontSize: 10.5, fontStyle: 'italic',
        color: 'rgba(255,255,255,0.3)',
        lineHeight: 1.5,
      }}>
        É isso que acontece quando alguém cuida da sua marca de verdade.
      </p>
    </div>
  )
}
