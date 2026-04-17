import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface Proyecto {
  id: number
  titulo: string
  descripcion: string
  descripcionLarga: string
  etiquetas: string[]
  color: string
  icono: string
  enlaceVivo: string
  destacados: string[]
}

const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: 'Portal de Banca en Línea',
    descripcion: 'Plataforma web segura para que clientes consulten saldos, hagan transferencias y paguen servicios desde cualquier dispositivo.',
    descripcionLarga: 'Sistema completo de banca digital con autenticación de doble factor, consulta de movimientos, transferencias interbancarias (SPEI), pago de servicios y descarga de estados de cuenta en PDF. Desarrollado bajo estrictos estándares de seguridad bancaria.',
    etiquetas: ['Angular', 'Java', 'Spring Boot', 'Sybase', 'REST API'],
    color: '#00f5ff',
    icono: '🏦',
    enlaceVivo: 'https://example.com',
    destacados: [
      'Más de 50,000 usuarios activos diarios',
      'Transferencias SPEI en tiempo real',
      'Autenticación segura con doble factor',
    ],
  },
  {
    id: 2,
    titulo: 'Sistema de Reportes Gerenciales',
    descripcion: 'Dashboard ejecutivo con gráficas en tiempo real que muestra al equipo directivo los indicadores clave del negocio.',
    descripcionLarga: 'Herramienta de inteligencia de negocios que consolida información de múltiples sistemas bancarios y la presenta de forma visual. Los directivos pueden monitorear cartera de crédito, captación, metas y alertas desde una sola pantalla.',
    etiquetas: ['React', 'TypeScript', 'Java', 'PostgreSQL', 'REST API'],
    color: '#bf00ff',
    icono: '📊',
    enlaceVivo: 'https://example.com',
    destacados: [
      'Datos actualizados cada 5 minutos',
      'Exportación a Excel y PDF con un clic',
      'Acceso diferenciado por rol directivo',
    ],
  },
  {
    id: 3,
    titulo: 'App de Gestión para PYME',
    descripcion: 'Sistema todo-en-uno para que pequeñas y medianas empresas controlen su inventario, ventas, clientes y facturas desde el celular o computadora.',
    descripcionLarga: 'Solución integral para negocios que antes llevaban todo en hojas de cálculo. Incluye control de inventario con alertas de stock bajo, facturación electrónica CFDI, catálogo de clientes y reportes de ventas mensuales.',
    etiquetas: ['React', 'Node.js', 'MySQL', 'JavaScript', 'TypeScript'],
    color: '#00ff88',
    icono: '🏪',
    enlaceVivo: 'https://example.com',
    destacados: [
      'Facturación electrónica CFDI integrada',
      'Control de inventario con alertas automáticas',
      'Funciona en celular, tablet y computadora',
    ],
  },
  {
    id: 4,
    titulo: 'Módulo de Solicitud de Créditos',
    descripcion: 'Sistema que digitaliza el proceso de solicitud y aprobación de préstamos, eliminando el papeleo y reduciendo el tiempo de respuesta al cliente.',
    descripcionLarga: 'Automatización del flujo completo de crédito: el cliente llena su solicitud en línea, el sistema verifica su historial crediticio, calcula su capacidad de pago y pasa la solicitud al área de riesgo con toda la información lista para decidir.',
    etiquetas: ['Angular', 'Java', 'Spring Boot', 'Sybase', 'REST API'],
    color: '#ff006e',
    icono: '💳',
    enlaceVivo: 'https://example.com',
    destacados: [
      'Tiempo de respuesta reducido de días a horas',
      'Integración con buró de crédito',
      'Documentación digital sin papel',
    ],
  },
  {
    id: 5,
    titulo: 'Tienda en Línea para Empresa Mediana',
    descripcion: 'E-commerce profesional con carrito de compras, pagos en línea y panel de administración para que la empresa gestione sus productos y pedidos.',
    descripcionLarga: 'Solución de comercio electrónico completa para una empresa distribuidora. Los clientes navegan el catálogo, agregan productos al carrito y pagan con tarjeta o transferencia. La empresa gestiona pedidos, stock y envíos desde un panel administrativo intuitivo.',
    etiquetas: ['React', 'TypeScript', 'Node.js', 'MySQL', 'JavaScript'],
    color: '#ffe600',
    icono: '🛒',
    enlaceVivo: 'https://example.com',
    destacados: [
      'Pagos con tarjeta, OXXO y transferencia',
      'Panel de administración sin necesidad de técnico',
      'Catálogo de más de 500 productos',
    ],
  },
  {
    id: 6,
    titulo: 'Sistema de Atención a Clientes',
    descripcion: 'Herramienta interna para que los asesores del banco registren, den seguimiento y resuelvan los casos y reclamaciones de los clientes.',
    descripcionLarga: 'CRM bancario que centraliza toda la historia de cada cliente: sus casos abiertos, llamadas previas, productos contratados y acuerdos tomados. Los asesores ya no buscan información en varios sistemas; todo está en un solo lugar, lo que reduce tiempos de atención.',
    etiquetas: ['Angular', 'Java', 'PostgreSQL', 'TypeScript', 'REST API'],
    color: '#00f5ff',
    icono: '🎧',
    enlaceVivo: 'https://example.com',
    destacados: [
      'Tiempo de resolución reducido 40%',
      'Historial completo del cliente en un clic',
      'Integración con telefonía y correo',
    ],
  },
]

function TarjetaProyecto({ proyecto, indice }: { proyecto: Proyecto; indice: number }) {
  const [expandido, setExpandido] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const estaEnVista = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: indice * 0.08 }}
    >
      <motion.div
        className="glass-card"
        whileHover={{ y: -6 }}
        style={{ padding: '28px', height: '100%', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        onClick={() => setExpandido(v => !v)}
      >
        {/* Línea de acento superior */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${proyecto.color}, transparent)`,
        }} />

        {/* Encabezado */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: `${proyecto.color}14`,
              border: `1px solid ${proyecto.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', flexShrink: 0,
            }}>
              {proyecto.icono}
            </div>
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '2px',
                lineHeight: 1.3,
              }}>
                {proyecto.titulo}
              </h3>
              <div style={{ width: '32px', height: '2px', background: proyecto.color, borderRadius: '1px' }} />
            </div>
          </div>

          {/* Enlace al demo */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
            <a
              href={proyecto.enlaceVivo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver demo"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = proyecto.color)}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Descripción corta */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
          {proyecto.descripcion}
        </p>

        {/* Detalle expandido */}
        <AnimatePresence>
          {expandido && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{
                fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75,
                marginBottom: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px',
              }}>
                {proyecto.descripcionLarga}
              </p>
              <ul style={{ marginBottom: '16px', paddingLeft: '0', listStyle: 'none' }}>
                {proyecto.destacados.map(d => (
                  <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    <span style={{ color: proyecto.color, fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>▸</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Etiquetas */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
          {proyecto.etiquetas.map(etiqueta => (
            <span
              key={etiqueta}
              style={{
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                background: `${proyecto.color}10`,
                border: `1px solid ${proyecto.color}30`,
                color: proyecto.color,
                letterSpacing: '0.04em',
              }}
            >
              {etiqueta}
            </span>
          ))}
        </div>

        {/* Pista de expansión */}
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.svg
            animate={{ rotate: expandido ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            style={{ color: proyecto.color }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
          <span style={{ fontSize: '0.72rem', color: proyecto.color, fontFamily: 'var(--font-mono)' }}>
            {expandido ? 'ocultar detalles' : 'ver detalles'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Proyectos() {
  const ref = useRef<HTMLDivElement>(null)
  const estaEnVista = useInView(ref, { once: true })

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Proyectos <span className="highlight">Destacados</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            maxWidth: '600px',
            margin: '-40px auto 56px',
            lineHeight: 1.8,
          }}
        >
          Sistemas reales que resuelven problemas cotidianos de empresas y personas.
          <span style={{ color: 'var(--neon-cyan)' }}> Toca cada tarjeta</span> para conocer más detalles.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
        }}>
          {proyectos.map((proyecto, i) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} indice={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
