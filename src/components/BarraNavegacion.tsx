import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ELEMENTOS_NAV = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

const estilosNav = {
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.4s ease',
  },
  desplazado: {
    background: 'rgba(5, 11, 26, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}

export default function BarraNavegacion() {
  const [desplazado, setDesplazado] = useState(false)
  const [activo, setActivo] = useState('hero')
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const alDesplazar = () => {
      setDesplazado(window.scrollY > 40)
      const secciones = ELEMENTOS_NAV.map(i => i.href.slice(1))
      for (const id of secciones) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActivo(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => window.removeEventListener('scroll', alDesplazar)
  }, [])

  return (
    <motion.nav
      style={{ ...estilosNav.nav, ...(desplazado ? estilosNav.desplazado : {}) }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={estilosNav.inner}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.25rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {'<E />'}
          </motion.div>
        </a>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', listStyle: 'none', gap: '8px', margin: 0, padding: 0 }}
            className="desktop-nav">
          {ELEMENTOS_NAV.map((elemento, i) => {
            const id = elemento.href.slice(1)
            const estaActivo = activo === id
            return (
              <li key={elemento.href}>
                <a
                  href={elemento.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    color: estaActivo ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    background: estaActivo ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                    border: `1px solid ${estaActivo ? 'rgba(0, 245, 255, 0.25)' : 'transparent'}`,
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (!estaActivo) {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!estaActivo) {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                    }
                  }}
                >
                  <span style={{ color: 'var(--neon-cyan)', fontSize: '0.65rem', opacity: 0.7 }}>
                    {`0${i + 1}.`}
                  </span>
                  {elemento.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label="Abrir menú"
          className="hamburger-btn"
          onClick={() => setMenuAbierto(v => !v)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate: menuAbierto ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuAbierto ? (i === 0 ? 10 : i === 2 ? -10 : 0) : 0,
                opacity: menuAbierto && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--neon-cyan)',
                borderRadius: '2px',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              background: 'rgba(5, 11, 26, 0.97)',
              borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {ELEMENTOS_NAV.map((elemento, i) => (
                <motion.a
                  key={elemento.href}
                  href={elemento.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuAbierto(false)}
                  style={{
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: activo === elemento.href.slice(1) ? 'var(--neon-cyan)' : 'var(--text-primary)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: 'var(--neon-cyan)', fontSize: '0.7rem' }}>{`0${i + 1}.`}</span>
                  {elemento.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
