import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import * as THREE from 'three'

/* ─── 3D Constelación de Partículas ─────────────────────────── */
function CampoParticulas({ color, cantidad, radio }: { color: string; cantidad: number; radio: number }) {
  const refPuntos = useRef<THREE.Points>(null)

  const posiciones = useMemo(() => {
    const arr = new Float32Array(cantidad * 3)
    for (let i = 0; i < cantidad; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radio * (0.6 + Math.random() * 0.8)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [cantidad, radio])

  useFrame(({ clock, pointer }) => {
    if (!refPuntos.current) return
    refPuntos.current.rotation.y = clock.elapsedTime * 0.04
    refPuntos.current.rotation.x = clock.elapsedTime * 0.015 + pointer.y * 0.08
    refPuntos.current.rotation.z = clock.elapsedTime * 0.008
  })

  return (
    <points ref={refPuntos}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posiciones, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.013}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function AnilloNebulosa() {
  const refMalla = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!refMalla.current) return
    refMalla.current.rotation.z = clock.elapsedTime * 0.06
    refMalla.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.3
  })
  return (
    <mesh ref={refMalla}>
      <torusGeometry args={[2.8, 0.004, 8, 200]} />
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.15} />
    </mesh>
  )
}

function Escena() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <CampoParticulas color="#00f5ff" cantidad={3500} radio={5} />
      <CampoParticulas color="#bf00ff" cantidad={1500} radio={4} />
      <CampoParticulas color="#00ff88" cantidad={800}  radio={3} />
      <AnilloNebulosa />
    </>
  )
}

/* ─── Íconos de redes sociales ───────────────────────────────────────── */
const redesSociales = [
  {
    label: 'Correo',
    href: 'mailto:contacto@solucionesg2.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

/* ─── Sección Principal ───────────────────────────────────────── */
export default function Inicio() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* Fondo Three.js */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 65 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Escena />
          </Suspense>
        </Canvas>
      </div>

      {/* Resplandor radial */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 245, 255, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Fondo de cuadrícula */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />

      {/* Degradado inferior */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', zIndex: 2,
        background: 'linear-gradient(to bottom, transparent, #050b1a)',
        pointerEvents: 'none',
      }} />

      {/* Contenido */}
      <div className="container" style={{ position: 'relative', zIndex: 3, paddingTop: '80px' }}>
        <div style={{ maxWidth: '780px' }}>

          {/* Pre-título */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--neon-cyan)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{
              display: 'inline-block', width: '40px', height: '1.5px',
              background: 'var(--neon-cyan)',
            }} />
            Somos
          </motion.div>

          {/* Nombre */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}
          >
            <span
              className="glitch"
              data-text="Soluciones G2"
              style={{ color: 'var(--text-primary)' }}
            >
              Soluciones G2
            </span>
          </motion.h1>

          {/* Rol dinámico */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: 'var(--neon-cyan)' }}>_</span>
            <span className="gradient-text">
              <TypeAnimation
                sequence={[
                  'Soluciones a la Medida',     2200,
                  'Sistemas para Empresas',     2200,
                  'Desarrollo Full Stack',      2200,
                  'Consultoría Tecnológica',    2200,
                  'Software para PYMEs',        2200,
                  'Integración Bancaria',       2200,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              maxWidth: '560px',
              marginBottom: '44px',
            }}
          >
            Asociación de ingenieros de software especializados en desarrollo a la medida.
            Construimos soluciones tecnológicas para empresas de todos los tamaños — desde PYMEs hasta grandes corporativos y el sector bancario.
          </motion.p>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '56px' }}
          >
            <a href="#projects" className="btn-primary">
              Ver Proyectos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Contáctanos</a>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          >
            {redesSociales.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, color: '#00f5ff' }}
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {s.icon}
              </motion.a>
            ))}
            <span style={{ width: '40px', height: '1px', background: 'var(--border-glass)' }} />
            <a
              href="mailto:contacto@solucionesg2.com"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}
            >
              contacto@solucionesg2.com
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicador de desplazamiento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '24px',
            height: '38px',
            border: '1.5px solid rgba(0, 245, 255, 0.25)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--neon-cyan)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
