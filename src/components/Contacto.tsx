import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { trackWhatsApp, trackFormulario } from '../utils/analytics'

interface EstadoFormulario {
  nombre: string
  correo: string
  asunto: string
  mensaje: string
}

const formularioInicial: EstadoFormulario = { nombre: '', correo: '', asunto: '', mensaje: '' }

const WA_BASE = 'https://wa.me/525522833604?text='
const WHATSAPP_URL = WA_BASE + encodeURIComponent('Hola Soluciones G2, me interesa conocer más sobre sus servicios.')
const WHATSAPP_AGENDA = WA_BASE + encodeURIComponent('Hola Soluciones G2, me interesa agendar una llamada de 15 minutos. ¿Cuándo tienen disponibilidad?')
const WHATSAPP_DISPLAY = '+52 55 2283 3604'

const infoContacto = [
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    etiqueta: 'Email',
    valor: 'solucionesg2.contacto@gmail.com',
    href: 'mailto:solucionesg2.contacto@gmail.com',
    color: '#00f5ff',
  },
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
    etiqueta: 'WhatsApp',
    valor: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    color: '#00ff88',
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
      trackFormulario('contacto')
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
          Trabajemos <span className="highlight">Juntos</span>
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
              ¿Tienes un proyecto en mente? ¿Necesitas un equipo de desarrollo para tu empresa?
              Estamos disponibles para proyectos a medida y consultoría tecnológica.
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
                Disponibles para nuevos proyectos
              </span>
            </div>

            {/* Botón Agendar por WhatsApp */}
            <motion.a
              href={WHATSAPP_AGENDA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('contacto-agenda')}
              initial={{ opacity: 0, x: -20 }}
              animate={estaEnVista ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.28 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 22px',
                borderRadius: '10px',
                background: 'rgba(0, 255, 136, 0.08)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                textDecoration: 'none',
                color: '#00ff88',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '24px',
                transition: 'all 0.25s ease',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>💬</span>
              Agenda una llamada de 15 min por WhatsApp
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 'auto', opacity: 0.6 }}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </motion.a>

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
                      onClick={elemento.etiqueta === 'WhatsApp' ? () => trackWhatsApp('contacto-tarjeta') : undefined}
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
                    ✓ ¡Gracias! Nos pondremos en contacto pronto.
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
                    ✗ Algo salió mal. Escríbenos directamente a solucionesg2.contacto@gmail.com
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
