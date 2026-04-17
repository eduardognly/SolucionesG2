import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

interface EstadoFormulario {
  nombre: string
  correo: string
  asunto: string
  mensaje: string
}

const formularioInicial: EstadoFormulario = { nombre: '', correo: '', asunto: '', mensaje: '' }

const infoContacto = [
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    etiqueta: 'Email',
    valor: 'eduardognly@gmail.com',
    href: 'mailto:eduardognly@gmail.com',
    color: '#00f5ff',
  },
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    etiqueta: 'LinkedIn',
    valor: 'linkedin.com/in/eduardognly',
    href: 'https://www.linkedin.com/in/eduardognly/',
    color: '#bf00ff',
  },
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    etiqueta: 'Ubicación',
    valor: 'Ciudad de México, MX',
    href: null,
    color: '#ff006e',
  },
]

const estiloEntrada = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '10px',
  border: '1.5px solid var(--border-glass)',
  background: 'rgba(0,0,0,0.25)',
  color: 'var(--text-primary)',
  fontSize: '0.92rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'all 0.25s ease',
}

export default function Contacto() {
  const ref = useRef<HTMLDivElement>(null)
  const estaEnVista = useInView(ref, { once: true, margin: '-80px' })
  const [formulario, setFormulario] = useState<EstadoFormulario>(formularioInicial)
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'enviado' | 'error'>('idle')
  const [enfocado, setEnfocado] = useState<string | null>(null)

  const manejarEnvio = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setEstado('enviando')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formulario.nombre,
          email: formulario.correo,
          title: formulario.asunto,
          message: formulario.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setEstado('enviado')
      setFormulario(formularioInicial)
      setTimeout(() => setEstado('idle'), 5000)
    } catch {
      setEstado('error')
      setTimeout(() => setEstado('idle'), 4000)
    }
  }

  const estilosCampo = (nombre: string) => ({
    ...estiloEntrada,
    borderColor: enfocado === nombre ? 'var(--neon-cyan)' : 'var(--border-glass)',
    boxShadow: enfocado === nombre ? '0 0 15px rgba(0, 245, 255, 0.1)' : 'none',
  })

  return (
    <section id="contact" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,27,46,0.25))' }}>
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Hablemos <span className="highlight">:)</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>

          {/* Izquierda: Información */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={estaEnVista ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              ¿Tienes un proyecto interesante? ¿Buscas un desarrollador fullstack para tu proyecto?
              Estoy disponible para proyectos freelance y consultoría técnica.
            </p>

            {/* Insignia de disponibilidad */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: '40px',
              background: 'rgba(0, 255, 136, 0.08)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              marginBottom: '40px',
            }}>
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', flexShrink: 0 }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#00ff88', fontWeight: 600 }}>
                Disponible para proyectos
              </span>
            </div>

            {/* Tarjetas de contacto */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {infoContacto.map((elemento, i) => (
                <motion.div
                  key={elemento.etiqueta}
                  initial={{ opacity: 0, x: -20 }}
                  animate={estaEnVista ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {elemento.href ? (
                    <a
                      href={elemento.href}
                      target={elemento.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="glass-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px 20px',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.borderColor = elemento.color
                        el.style.boxShadow = `0 0 20px ${elemento.color}20`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.borderColor = 'var(--border-glass)'
                        el.style.boxShadow = 'none'
                      }}
                    >
                      <span style={{ color: elemento.color, flexShrink: 0 }}>{elemento.icono}</span>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '2px' }}>{elemento.etiqueta}</div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>{elemento.valor}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
                      <span style={{ color: elemento.color, flexShrink: 0 }}>{elemento.icono}</span>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '2px' }}>{elemento.etiqueta}</div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>{elemento.valor}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Derecha: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={estaEnVista ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="glass-card" style={{ padding: '36px' }}>
              <form onSubmit={manejarEnvio} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)', marginBottom: '8px', letterSpacing: '0.08em' }}>
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      value={formulario.nombre}
                      onChange={e => setFormulario(f => ({ ...f, nombre: e.target.value }))}
                      onFocus={() => setEnfocado('nombre')}
                      onBlur={() => setEnfocado(null)}
                      placeholder="Tu nombre"
                      required
                      style={estilosCampo('nombre')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)', marginBottom: '8px', letterSpacing: '0.08em' }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={formulario.correo}
                      onChange={e => setFormulario(f => ({ ...f, correo: e.target.value }))}
                      onFocus={() => setEnfocado('correo')}
                      onBlur={() => setEnfocado(null)}
                      placeholder="tu@email.com"
                      required
                      style={estilosCampo('correo')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)', marginBottom: '8px', letterSpacing: '0.08em' }}>
                    ASUNTO
                  </label>
                  <input
                    type="text"
                    value={formulario.asunto}
                    onChange={e => setFormulario(f => ({ ...f, asunto: e.target.value }))}
                    onFocus={() => setEnfocado('asunto')}
                    onBlur={() => setEnfocado(null)}
                    placeholder="¿De qué se trata?"
                    required
                    style={estilosCampo('asunto')}
                  />
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)', marginBottom: '8px', letterSpacing: '0.08em' }}>
                    MENSAJE
                  </label>
                  <textarea
                    value={formulario.mensaje}
                    onChange={e => setFormulario(f => ({ ...f, mensaje: e.target.value }))}
                    onFocus={() => setEnfocado('mensaje')}
                    onBlur={() => setEnfocado(null)}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    required
                    rows={5}
                    style={{ ...estilosCampo('mensaje'), resize: 'vertical', minHeight: '130px', display: 'block' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={estado !== 'idle'}
                  className="btn-primary"
                  whileHover={estado === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={estado === 'idle' ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: estado === 'enviando' ? 0.7 : 1,
                    cursor: estado !== 'idle' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {estado === 'idle' && (
                    <>
                      Enviar Mensaje
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                  {estado === 'enviando' && (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        style={{ display: 'inline-block' }}
                      >
                        ⟳
                      </motion.span>
                      Enviando...
                    </>
                  )}
                  {estado === 'enviado' && <>✓ Mensaje enviado</>}
                  {estado === 'error' && <>✗ Error al enviar</>}
                </motion.button>

                {estado === 'enviado' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: '#00ff88',
                    }}
                  >
                    ✓ ¡Gracias! Te responderé pronto.
                  </motion.p>
                )}

                {estado === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: '#ff006e',
                    }}
                  >
                    ✗ Algo salió mal. Escríbeme directamente a eduardognly@gmail.com
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
