'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ─── Vertex shader ─────────────────────────────────────────────────────────── */
const vert = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

/* ─── Fragment shader ───────────────────────────────────────────────────────── */
const frag = /* glsl */`
precision highp float;

uniform float u_time;
uniform vec2  u_res;
varying vec2  vUv;

/* ── Hash & smooth noise ───────────────────────────────────────────────────── */
float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p  = p * 2.1 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

/* ── Circular wave from a moving source ────────────────────────────────────── */
float wave(vec2 uv, vec2 src, float freq, float speed, float phase) {
  float d = length(uv - src);
  float envelope = 1.0 / (1.0 + d * 4.5);           // amplitude falls with distance
  return sin(d * freq - u_time * speed + phase) * envelope;
}

void main() {
  /* Aspect-correct coords, centred */
  vec2 uv = vUv - 0.5;
  uv.x   *= u_res.x / u_res.y;

  float t = u_time * 0.3;

  /* ── Four slowly orbiting wave sources ─────────────────────────────────── */
  vec2 s0 = vec2( sin(t * 0.71) * 0.38,  cos(t * 0.53) * 0.24);
  vec2 s1 = vec2( cos(t * 0.47) * 0.32,  sin(t * 0.61) * 0.30);
  vec2 s2 = vec2( sin(t * 0.38 + 1.4) * 0.28, cos(t * 0.79) * 0.35);
  vec2 s3 = vec2( cos(t * 0.55 + 2.1) * 0.22, sin(t * 0.44 + 0.9) * 0.20);

  float w  = wave(uv, s0, 13.0, 2.6, 0.0)
           + wave(uv, s1, 11.0, 2.2, 1.1)
           + wave(uv, s2, 15.0, 3.0, 2.3)
           + wave(uv, s3,  9.0, 1.8, 3.7);
  w *= 0.26;

  /* ── Slow horizontal aurora sweep ──────────────────────────────────────── */
  float aurora = sin(uv.x * 2.4 + t * 0.6) * 0.06
               + sin(uv.y * 3.2 - t * 0.4) * 0.05;
  w += aurora;

  /* ── FBM detail layer ───────────────────────────────────────────────────── */
  float detail = fbm(uv * 4.0 + t * 0.15) * 0.07 - 0.035;
  w += detail;

  /* ── Map to [0,1] ───────────────────────────────────────────────────────── */
  float b = clamp(w * 0.5 + 0.5, 0.0, 1.0);

  /* ── Colour stops ──────────────────────────────────────────────────────────
     #060D1F  →  #1D4ED8  →  #60A5FA  →  near-white electric peak            */
  vec3 cBase  = vec3(0.024, 0.051, 0.122);   /* #060D1F */
  vec3 cBlue  = vec3(0.114, 0.306, 0.847);   /* #1D4ED8 */
  vec3 cCyan  = vec3(0.376, 0.647, 0.980);   /* #60A5FA */
  vec3 cPeak  = vec3(0.82,  0.92,  1.00);    /* electric white */

  vec3 col = cBase;
  col = mix(col,   cBlue, smoothstep(0.25, 0.55, b));
  col = mix(col,   cCyan, smoothstep(0.50, 0.78, b));
  col = mix(col,   cPeak, smoothstep(0.80, 1.00, b) * 0.30);

  /* ── Bright specular flare at interference peaks ───────────────────────── */
  col += cCyan * pow(max(w, 0.0), 4.0) * 0.25;

  gl_FragColor = vec4(col, 1.0);
}
`

export default function WebGLShader() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    /* ── Renderer ─────────────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    /* ── Orthographic scene — full-screen plane, no camera transform ─────── */
    const scene    = new THREE.Scene()
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      u_time: { value: 0 },
      u_res:  { value: new THREE.Vector2(el.clientWidth, el.clientHeight) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms,
    })

    scene.add(new THREE.Mesh(geometry, material))

    /* ── Resize ───────────────────────────────────────────────────────────── */
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h)
      uniforms.u_res.value.set(w, h)
    })
    ro.observe(el)

    /* ── Render loop ──────────────────────────────────────────────────────── */
    let raf: number
    const clock = new THREE.Clock()
    const tick  = () => {
      raf = requestAnimationFrame(tick)
      uniforms.u_time.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    />
  )
}
