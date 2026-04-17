import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const lineasCodigo = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'const' }, { t: 'space', v: ' ' }, { t: 'var', v: 'ingeniero' }, { t: 'op', v: ' = ' }, { t: 'punct', v: '{' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'nombre' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Eduardo"' }, { t: 'punct', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'titulo' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Ingeniero en Computación"' }, { t: 'punct', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'universidad' }, { t: 'op', v: ': ' }, { t: 'str', v: '"UNAM 🦁"' }, { t: 'punct', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'diplomado' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Desarrollo de Software · UNAM"' }, { t: 'punct', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'empresa_actual' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Banco · Desarrollador de Software"' }, { t: 'punct', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'sectores' }, { t: 'op', v: ': ' }, { t: 'punct', v: '[' }] },
  { indent: 2, tokens: [{ t: 'str', v: '"Banca y Finanzas"' }, { t: 'punct', v: ',' }] },
  { indent: 2, tokens: [{ t: 'str', v: '"Pequeñas y Medianas Empresas"' }, { t: 'punct', v: ',' }] },
  { indent: 2, tokens: [{ t: 'str', v: '"Grandes Corporativos"' }, { t: 'punct', v: ',' }] },
  { indent: 1, tokens: [{ t: 'punct', v: '],' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'disponible' }, { t: 'op', v: ': ' }, { t: 'bool', v: 'true' }] },
  { indent: 0, tokens: [{ t: 'punct', v: '}' }] },
]

const colorToken = (tipo: string) => {
  switch (tipo) {
    case 'keyword': return '#bf00ff'
    case 'var':     return '#00f5ff'
    case 'key':     return '#7aa5c0'
    case 'str':     return '#00ff88'
    case 'bool':    return '#ff006e'
    case 'op':      return '#e0f4ff'
    case 'punct':   return '#7aa5c0'
    case 'space':   return 'transparent'
    default:        return '#e0f4ff'
  }
}

export default function SobreMi() {
  const ref = useRef<HTMLDivElement>(null)
  const estaEnVista = useInView(ref, { once: true, margin: '-100px' })

  const variantesContenedor = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const variantesElemento = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  }

  return (
    <section id="about" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,27,46,0.3), transparent)' }}>
      <div className="container" ref={ref}>
        <motion.div
          variants={variantesContenedor}
          initial="hidden"
          animate={estaEnVista ? 'visible' : 'hidden'}
        >
          {/* Título */}
          <motion.h2 className="section-title" variants={variantesElemento}>
            Sobre <span className="highlight">Mí</span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>

            {/* Columna de texto */}
            <motion.div variants={variantesElemento}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '20px' }}>
               <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>Ingeniero en Desarrollo de Software egresado de la UNAM</span></p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '20px' }}>
                Actualmente trabajo como <strong style={{ color: 'var(--text-primary)' }}>Desarrollador de Software en el sector bancario</strong>,
                trabajando con sistemas que procesan millones de transacciones diarias con seguridad y confiabilidad.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '36px' }}>
                Me especializo en crear <strong style={{ color: 'var(--text-primary)' }}>soluciones tecnológicas a medida</strong> para empresas
                de todos los tamaños: desde pequeños negocios que necesitan su primera app, hasta{' '}
                <strong style={{ color: 'var(--text-primary)' }}>grandes empresas</strong> que requieren sistemas escalables.
              </p>

              {/* Insignia UNAM */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                borderRadius: '40px',
                background: 'rgba(0, 245, 255, 0.06)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                marginBottom: '28px',
              }}>
                <span style={{ fontSize: '1.2rem' }}>🦁</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Universidad Nacional Autónoma de México
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="#projects" className="btn-primary" style={{ fontSize: '0.9rem', padding: '10px 22px' }}>
                  Ver Proyectos
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: '0.9rem', padding: '10px 22px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Descargar CV
                </a>
              </div>
            </motion.div>

            {/* Bloque de código */}
            <motion.div variants={variantesElemento}>
              <div
                className="glass-card"
                style={{ padding: 0, overflow: 'hidden', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
              >
                {/* Barra de título estilo terminal */}
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0, 0, 0, 0.2)',
                }}>
                  {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
                    <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.85 }} />
                  ))}
                  <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>perfil.ts</span>
                </div>

                {/* Líneas de código */}
                <div style={{ padding: '20px 24px', lineHeight: 1.7 }}>
                  {lineasCodigo.map((linea, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={estaEnVista ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
                      style={{
                        display: 'flex',
                        paddingLeft: `${linea.indent * 20}px`,
                        minHeight: '22px',
                      }}
                    >
                      <span style={{ color: 'var(--text-dim)', marginRight: '20px', userSelect: 'none', minWidth: '18px', textAlign: 'right', fontSize: '0.7rem' }}>
                        {i + 1}
                      </span>
                      <span>
                        {linea.tokens.map((tok, j) => (
                          <span key={j} style={{ color: colorToken(tok.t) }}>{tok.v}</span>
                        ))}
                      </span>
                    </motion.div>
                  ))}
                  {/* Cursor parpadeante */}
                  <div style={{ display: 'flex', paddingLeft: '0', marginTop: '2px' }}>
                    <span style={{ color: 'var(--text-dim)', marginRight: '20px', minWidth: '18px', textAlign: 'right', fontSize: '0.7rem' }}>
                      {lineasCodigo.length + 1}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ display: 'inline-block', width: '8px', height: '14px', background: 'var(--neon-cyan)', verticalAlign: 'middle' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
