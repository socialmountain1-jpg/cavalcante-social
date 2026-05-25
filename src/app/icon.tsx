import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            color: '#1D4ED8',
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '-0.5px',
            fontFamily: 'sans-serif',
          }}
        >
          CSM
        </div>
      </div>
    ),
    { ...size }
  )
}
