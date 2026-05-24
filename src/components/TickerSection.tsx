const ROW_ONE = [
  'MAIS CLIENTES →',
  'MAIS PRESENÇA →',
  'MARCA QUE VENDE →',
  'CONTEÚDO QUE ENGAJA →',
  'SITE QUE CONVERTE →',
  'RESULTADO REAL →',
]

const ROW_TWO = [
  'SOCIAL MEDIA →',
  'DESIGN →',
  'CRIAÇÃO DE SITES →',
  'MENTORIA →',
  'ESTRATÉGIA →',
  'IDENTIDADE VISUAL →',
]

function TickerRow({
  items,
  direction,
  color,
}: {
  items: string[]
  direction: 'ltr' | 'rtl'
  color: string
}) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: `ticker-${direction} 20s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              padding: '0 52px',
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TickerSection() {
  return (
    <section
      style={{
        width: '100%',
        background: '#0F172A',
        paddingTop: 56,
        paddingBottom: 56,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        overflow: 'hidden',
      }}
      aria-hidden
    >
      <TickerRow items={ROW_ONE} direction="ltr" color="#ffffff" />
      <TickerRow items={ROW_TWO} direction="rtl" color="#60A5FA" />
    </section>
  )
}
