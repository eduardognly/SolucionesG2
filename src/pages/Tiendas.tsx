import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { trackWhatsApp, trackFormulario } from '../utils/analytics'

const WA_BASE = 'https://wa.me/525522833604?text='
const WHATSAPP_AGENDA = WA_BASE + encodeURIComponent('Hola Soluciones G2, tengo una tienda y me interesa agendar una llamada de 15 minutos. ¿Cuándo tienen disponibilidad?')
const WHATSAPP_URL = WA_BASE + encodeURIComponent('Hola Soluciones G2, tengo una tienda y quisiera conocer sus soluciones. ¿Podemos hablar?')

const problemas = [
  {
    icono: '📦',
    titulo: 'Inventario en cuadernos o Excel',
    descripcion: 'Conteos manuales que toman horas, errores de captura y productos que se agotan sin darte cuenta. Tu tiempo vale más que eso.',
    color: '#ff006e',
  },
  {
    icono: '🔍',
    titulo: 'No sabes qué productos se venden más',
    descripcion: 'Sin reportes de ventas, compras lo mismo cada semana. Algunos productos se quedan sin vender y otros siempre se agotan.',
    color: '#bf00ff',
  },
  {
    icono: '📉',
    titulo: 'Pérdidas por robo o error en caja',
    descripcion: 'Sin cámaras de seguridad ni control de caja digital, el dinero puede desaparecer sin rastro.',
    color: '#00f5ff',
  },
]

const soluciones = [
  {
    icono: '🖥️',
    titulo: 'Punto de venta (POS) a la medida',
    descripcion: 'Registra cada venta con código de barras o manual. Control de caja, historial de ventas y cortes automáticos.',
    color: '#00f5ff',
  },
  {
    icono: '📦',
    titulo: 'Control de inventario inteligente',
    descripcion: 'Cada venta descuenta del inventario en automático. Alertas de mínimos y reportes de stock en tiempo real.',
    color: '#00ff88',
  },
  {
    icono: '📷',
    titulo: 'Cámaras de seguridad anti-robo',
    descripcion: 'Vigilancia en caja, almacén y entradas. Acceso desde tu celular las 24 horas con grabación continua.',
    color: '#ff006e',
  },
  {
    icono: '📡',
    titulo: 'Red WiFi profesional',
    descripcion: 'Red estable para tu POS, lectores de código de barras, impresoras y cámaras. Sin caídas en horario pico.',
    color: '#bf00ff',
  },
]

interface Formulario { nombre: string; correo: string; mensaje: string }

export default function Tiendas() {
  const refProblemas = useRef<HTMLDivElement>(null)
  const refSoluciones = useRef<HTMLDivElement>(null)
  const refContacto = useRef<HTMLDivElement>(null)
  const problemasVisible = useInView(refProblemas, { once: true, margin: '-60px' })
  const solucionesVisible = useInView(refSoluciones, { once: true, margin: '-60px' })
  const contactoVisible = useInView(refContacto, { once: true, margin: '-60px' })

  const [form, setForm] = useState<Formulario>({ nombre: '', correo: '', mensaje: '' })
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'enviado' | 'error'>('idle')
  const [enfocado, setEnfocado] = useState<string | null>(null)

  const enviar = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.nombre,
          email: form.correo,
          title: 'Landing Tiendas',
          message: form.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setEstado('enviado')
      setForm({ nombre: '', correo: '', mensaje: '' })
      trackFormulario('tiendas')
      setTimeout(() => setEstado('idle'), 5000)
    } catch {
      setEstado('error')
      setTimeout(() => setEstado('idle'), 4000)
    }
  }

  const campoEstilo = (nombre: string) => ({
    width: '100%',
    padding: '13px 16px',
    borderRadius: '10px',
    border: `1.5px solid ${enfocado === nombre ? 'var(--neon-cyan)' : 'var(--border-glass)'}`,
    background: 'rgba(0,0,0,0.25)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxShadow: enfocado === nombre ? '0 0 15px rgba(0, 245, 255, 0.1)' : 'none',
  })

  return (
    <>
      <Helmet>
        <title>Sistema de Inventario para Tiendas en CDMX | Soluciones G2</title>
        <meta name="description" content="Control de inventario y punto de venta a la medida para tiendas en CDMX. Cámaras de seguridad anti-robo y red WiFi profesional. Sin mensualidades." />
        <link rel="canonical" href="https://solucionesg2.com/tiendas" />
        <meta property="og:title" content="Control de Inventario para Tiendas en CDMX | Soluciones G2" />
        <meta property="og:description" content="Sistema de punto de venta, control de inventario, cámaras anti-robo y red WiFi para tiendas en CDMX." />
        <meta property="og:url" content="https://solucionesg2.com/tiendas" />
      </Helmet>

      <div style={{ background: 'var(--bg-primary, #050b1a)', minHeight: '100vh', color: 'var(--text-primary, #e2e8f0)' }}>

        {/* Nav */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: 'rgba(5, 11, 26, 0.92)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
          padding: '0 24px', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'var(--text-muted, #94a3b8)', textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00f5ff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted, #94a3b8)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver al inicio
          </Link>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {'<G2 />'}
          </div>
          <a
            href={WHATSAPP_AGENDA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp('tiendas-nav')}
            style={{
              padding: '8px 18px', borderRadius: '8px',
              background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#00f5ff', textDecoration: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
            }}
          >
            WhatsApp
          </a>
        </nav>

        {/* Hero */}
        <section style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '120px 24px 80px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(191,0,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,245,255,0.04) 0%, transparent 60%)',
        }}>
          <div style={{ maxWidth: '760px', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '40px', marginBottom: '28px',
                background: 'rgba(191, 0, 255, 0.08)', border: '1px solid rgba(191, 0, 255, 0.25)',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#bf00ff',
              }}
            >
              <span>🏪</span> Para tiendas en CDMX y Estado de México
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15,
                marginBottom: '24px', letterSpacing: '-0.02em',
              }}
            >
              Control de inventario
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #bf00ff, #00f5ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                para tu tienda
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: '1.1rem', color: 'var(--text-muted, #94a3b8)',
                lineHeight: 1.75, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px',
              }}
            >
              Deja de contar con cuaderno. Un sistema a la medida que controla tu inventario,
              registra ventas y te dice exactamente qué pedir y cuándo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <a
                href={WHATSAPP_AGENDA}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #bf00ff, #00f5ff)',
                  color: '#050b1a', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
                  boxShadow: '0 0 30px rgba(191, 0, 255, 0.25)',
                }}
                onClick={() => trackWhatsApp('tiendas-hero-agenda')}
              >
                💬 Agenda una llamada por WhatsApp
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('tiendas-hero-wa')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '10px',
                  background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
                  color: '#00ff88', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
                }}
              >
                💬 Escríbenos por WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* Problemas */}
        <section style={{ padding: '80px 24px' }} ref={refProblemas}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={problemasVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '16px' }}
            >
              ¿Tu tienda enfrenta{' '}
              <span style={{ color: '#ff006e' }}>estos problemas?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={problemasVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ textAlign: 'center', color: 'var(--text-muted, #94a3b8)', marginBottom: '56px', fontSize: '0.95rem' }}
            >
              Son los más comunes en tiendas que aún operan de forma manual.
            </motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {problemas.map((p, i) => (
                <motion.div
                  key={p.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  animate={problemasVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card"
                  style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                  }} />
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{p.icono}</div>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', color: p.color }}>{p.titulo}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted, #94a3b8)', lineHeight: 1.7 }}>{p.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluciones */}
        <section style={{ padding: '80px 24px', background: 'rgba(191,0,255,0.02)' }} ref={refSoluciones}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={solucionesVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '56px' }}
            >
              Cómo te{' '}
              <span style={{
                background: 'linear-gradient(135deg, #bf00ff, #00f5ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                ayudamos
              </span>
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {soluciones.map((s, i) => (
                <motion.div
                  key={s.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  animate={solucionesVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card"
                  whileHover={{ y: -4, borderColor: s.color }}
                  style={{ padding: '28px', transition: 'border-color 0.25s ease' }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${s.color}14`, border: `1px solid ${s.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', marginBottom: '16px',
                  }}>
                    {s.icono}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>{s.titulo}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #94a3b8)', lineHeight: 1.7 }}>{s.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner CTA */}
        <section style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              padding: '48px 40px', borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(191,0,255,0.07), rgba(0,245,255,0.07))',
              border: '1px solid rgba(191, 0, 255, 0.2)',
            }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, marginBottom: '12px' }}>
                ¿Listo para tener el control de tu tienda?
              </h2>
              <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '32px', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Hablemos 15 minutos. Te mostramos cómo funciona y cuánto te costaría.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={WHATSAPP_AGENDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 26px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #bf00ff, #00f5ff)',
                    color: '#050b1a', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                  }}
                  onClick={() => trackWhatsApp('tiendas-cta')}
                >
                  💬 Agendar por WhatsApp
                </a>
                <a
                  href="#contacto"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 26px', borderRadius: '10px',
                    background: 'transparent', border: '1px solid rgba(191,0,255,0.3)',
                    color: '#bf00ff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
                  }}
                >
                  Enviar mensaje
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario de contacto */}
        <section id="contacto" style={{ padding: '80px 24px' }} ref={refContacto}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={contactoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}
            >
              Cuéntanos sobre tu tienda
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={contactoVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ textAlign: 'center', color: 'var(--text-muted, #94a3b8)', marginBottom: '40px', fontSize: '0.9rem' }}
            >
              Te respondemos en menos de 24 horas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-card"
              style={{ padding: '36px' }}
            >
              <form onSubmit={enviar} noValidate>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f5ff', marginBottom: '8px', letterSpacing: '0.08em' }}>NOMBRE</label>
                  <input type="text" value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    onFocus={() => setEnfocado('nombre')} onBlur={() => setEnfocado(null)}
                    placeholder="Tu nombre" required style={campoEstilo('nombre')}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f5ff', marginBottom: '8px', letterSpacing: '0.08em' }}>EMAIL</label>
                  <input type="email" value={form.correo}
                    onChange={e => setForm(f => ({ ...f, correo: e.target.value }))}
                    onFocus={() => setEnfocado('correo')} onBlur={() => setEnfocado(null)}
                    placeholder="tu@tienda.com" required style={campoEstilo('correo')}
                  />
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f5ff', marginBottom: '8px', letterSpacing: '0.08em' }}>¿QUÉ NECESITAS?</label>
                  <textarea value={form.mensaje}
                    onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                    onFocus={() => setEnfocado('mensaje')} onBlur={() => setEnfocado(null)}
                    placeholder="Cuéntanos qué tipo de tienda tienes, cuántos productos manejas y qué problemas quieres resolver..."
                    required rows={5}
                    style={{ ...campoEstilo('mensaje'), resize: 'vertical', minHeight: '120px', display: 'block' }}
                  />
                </div>
                <motion.button type="submit" disabled={estado !== 'idle'} className="btn-primary"
                  whileHover={estado === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={estado === 'idle' ? { scale: 0.98 } : {}}
                  style={{ width: '100%', justifyContent: 'center', opacity: estado === 'enviando' ? 0.7 : 1, cursor: estado !== 'idle' ? 'not-allowed' : 'pointer' }}
                >
                  {estado === 'idle' && 'Enviar mensaje'}
                  {estado === 'enviando' && 'Enviando...'}
                  {estado === 'enviado' && '✓ Mensaje enviado'}
                  {estado === 'error' && '✗ Error — escríbenos a solucionesg2.contacto@gmail.com'}
                </motion.button>
                {estado === 'enviado' && (
                  <p style={{ textAlign: 'center', color: '#00ff88', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: '12px' }}>
                    ¡Gracias! Te contactamos en menos de 24 horas.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '32px 24px', textAlign: 'center', borderTop: '1px solid rgba(0, 245, 255, 0.08)' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '8px',
          }}>
            {'<SolucionesG2 />'}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim, #475569)' }}>
            © 2025 Soluciones G2 · Ciudad de México ·{' '}
            <Link to="/" style={{ color: '#00f5ff', textDecoration: 'none' }}>Ver todos los servicios</Link>
          </p>
        </footer>
      </div>
    </>
  )
}
