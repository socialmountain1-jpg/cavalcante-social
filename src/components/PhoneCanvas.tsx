'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PhoneCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    el.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 5)

    // ── Lighting — dramatic blue cinematic ────────────────────────────────────
    scene.add(new THREE.AmbientLight('#030a18', 2))

    const keyLight = new THREE.PointLight('#60A5FA', 18, 30)
    keyLight.position.set(-4, 5, 4)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight('#1D4ED8', 7, 25)
    fillLight.position.set(4, -4, 2)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight('#93C5FD', 12, 20)
    rimLight.position.set(0, 2, -5)
    scene.add(rimLight)

    const topLight = new THREE.PointLight('#60A5FA', 5, 15)
    topLight.position.set(0, 8, 2)
    scene.add(topLight)

    // ── Phone group ───────────────────────────────────────────────────────────
    const phoneGroup = new THREE.Group()
    scene.add(phoneGroup)

    const PW = 0.75, PH = 1.55, PD = 0.082

    // ── Body — dark glass / metal ─────────────────────────────────────────────
    const bodyGeo = new THREE.BoxGeometry(PW, PH, PD)
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#080c16'),
      roughness: 0.06,
      metalness: 0.88,
      reflectivity: 1.0,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    })
    phoneGroup.add(new THREE.Mesh(bodyGeo, bodyMat))

    // ── Glow edge layers — fake bloom ─────────────────────────────────────────
    const glowLayers: [number, number, number][] = [
      [0.018, 0.78, 3.8],
      [0.042, 0.32, 2.2],
      [0.085, 0.13, 1.1],
      [0.15,  0.045, 0.5],
    ]
    glowLayers.forEach(([s, op, ei]) => {
      const geo = new THREE.BoxGeometry(PW + s, PH + s, PD + s)
      const mat = new THREE.MeshStandardMaterial({
        color: '#60A5FA',
        emissive: new THREE.Color('#60A5FA'),
        emissiveIntensity: ei,
        side: THREE.BackSide,
        transparent: true,
        opacity: op,
        depthWrite: false,
      })
      phoneGroup.add(new THREE.Mesh(geo, mat))
    })

    // ── Screen canvas texture ─────────────────────────────────────────────────
    const cv = document.createElement('canvas')
    cv.width = 300; cv.height = 612
    const ctx = cv.getContext('2d')!

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, 612)
    bg.addColorStop(0,    '#060f26')
    bg.addColorStop(0.35, '#1D4ED8')
    bg.addColorStop(0.7,  '#1e3a8a')
    bg.addColorStop(1,    '#020810')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 300, 612)

    // Glow orb
    const orb = ctx.createRadialGradient(150, 300, 0, 150, 300, 155)
    orb.addColorStop(0, 'rgba(96,165,250,0.45)')
    orb.addColorStop(1, 'rgba(96,165,250,0)')
    ctx.fillStyle = orb
    ctx.fillRect(0, 0, 300, 612)

    // Scan lines
    ctx.strokeStyle = 'rgba(96,165,250,0.04)'
    ctx.lineWidth = 1
    for (let y = 0; y < 612; y += 9) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(300, y); ctx.stroke()
    }

    const card = (x: number, y: number, w: number, h: number, sub: string, val: string) => {
      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      ctx.strokeStyle = 'rgba(96,165,250,0.28)'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, 10)
      else ctx.rect(x, y, w, h)
      ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '10px system-ui'
      ctx.fillText(sub, x + 12, y + 20)
      ctx.fillStyle = 'rgba(96,165,250,1)'
      ctx.font = 'bold 22px system-ui'
      ctx.fillText(val, x + 12, y + 52)
    }

    // Brand
    ctx.fillStyle = 'rgba(96,165,250,0.65)'
    ctx.font = 'bold 9px system-ui'
    ctx.fillText('CAVALCANTE · SOCIAL MÍDIA', 18, 50)

    card(18,  70,  120, 68, 'Engajamento', '+320%')
    card(152, 70,  130, 68, 'Alcance',     '×10')
    card(18,  154, 264, 68, 'Crescimento de seguidores', '+300%')
    card(18,  238, 264, 68, 'Satisfação dos clientes',   '98%')

    // Notch
    ctx.fillStyle = 'rgba(0,0,0,0.65)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(100, 6, 100, 18, 9)
    else ctx.rect(100, 6, 100, 18)
    ctx.fill()

    // Home bar
    ctx.fillStyle = 'rgba(255,255,255,0.22)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(95, 596, 110, 5, 3)
    else ctx.rect(95, 596, 110, 5)
    ctx.fill()

    const screenTex = new THREE.CanvasTexture(cv)
    const screenGeo = new THREE.PlaneGeometry(PW * 0.876, PH * 0.878)
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTex,
      emissive: new THREE.Color('#1a3080'),
      emissiveIntensity: 0.38,
    })
    const screenMesh = new THREE.Mesh(screenGeo, screenMat)
    screenMesh.position.z = PD / 2 + 0.002
    phoneGroup.add(screenMesh)

    // ── Camera module (back) ──────────────────────────────────────────────────
    const camGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.014, 32)
    const camMat = new THREE.MeshStandardMaterial({ color: '#07090f', roughness: 0.15, metalness: 0.95 })
    const cam = new THREE.Mesh(camGeo, camMat)
    cam.rotation.x = Math.PI / 2
    cam.position.set(-0.16, 0.57, -(PD / 2) - 0.007)
    phoneGroup.add(cam)

    const ringGeo = new THREE.TorusGeometry(0.053, 0.009, 8, 32)
    const ringMat = new THREE.MeshStandardMaterial({
      color: '#60A5FA', emissive: '#60A5FA', emissiveIntensity: 1.2,
      metalness: 0.9, roughness: 0.08,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.copy(cam.position)
    phoneGroup.add(ring)

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!el) return
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId: number
    const t0 = performance.now()

    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const t = (performance.now() - t0) * 0.001
      phoneGroup.position.y = Math.sin(t * 0.7)  * 0.13
      phoneGroup.rotation.y = Math.sin(t * 0.45) * (15 * Math.PI / 180)
      phoneGroup.rotation.x = 0.06 + Math.sin(t * 0.55) * (3 * Math.PI / 180)
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      bodyGeo.dispose(); bodyMat.dispose()
      screenGeo.dispose(); screenMat.dispose(); screenTex.dispose()
      camGeo.dispose(); camMat.dispose()
      ringGeo.dispose(); ringMat.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" />
}
