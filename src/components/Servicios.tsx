import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const servicios = [
  {
    icono: '🌐',
    titulo: 'Redes para Oficinas',
    descripcion: 'Diseño e instalación de redes LAN/WiFi para oficinas y negocios. Cableado estructurado, configuración de routers, switches y puntos de acceso para que tu equipo siempre esté conectado.',
    puntos: [
      'Cableado estructurado Cat6 certificado',
      'Configuración de WiFi empresarial con cobertura total',
      'Segmentación de red por área o departamento',
      'Soporte y mantenimiento posterior',
    ],
    color: '#00f5ff',
  },
  {
    icono: '📷',
    titulo: 'Cámaras de Seguridad',
    descripcion: 'Instalación de sistemas de videovigilancia IP para negocios, bodegas y oficinas. Accede a tus cámaras desde el celular en cualquier momento y mantén seguro tu negocio.',
    puntos: [
      'Cámaras IP con visión nocturna',
      'Acceso remoto desde celular o computadora',
      'Grabación continua con almacenamiento local o en nube',
      'Instalación limpia y discreta',
    ],
    color: '#bf00ff',
  },
  {
    icono: '🔧',
    titulo: 'Soporte Técnico',
    descripcion: 'Mantenimiento preventivo y correctivo de equipos de cómputo, redes y sistemas de seguridad. Atención rápida para que tu negocio no se detenga.',
    puntos: [
      'Diagnóstico y reparación de equipos',
      'Mantenimiento preventivo programado',
      'Atención en sitio en CDMX y Estado de México',
      'Tiempos de respuesta acordados por contrato',
    ],
    color: '#00ff88',
  },
]

export default function Servicios() {
  const ref = useRef<HTMLDivElement>(null)
  const estaEnVista = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,27,46,0.3), transparent)' }}>
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Servicios <span className="highlight">Presenciales</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            maxWidth: '560px',
            margin: '-40px auto 56px',
            lineHeight: 1.8,
          }}
        >
          Instalación y configuración en sitio para negocios en{' '}
          <span style={{ color: 'var(--neon-cyan)' }}>CDMX y Estado de México</span>.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {servicios.map((servicio, i) => (
            <motion.div
              key={servicio.titulo}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: servicio.color }}
              style={{ padding: '32px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s ease' }}
            >
              {/* Línea superior */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${servicio.color}, transparent)`,
              }} />

              {/* Ícono */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: `${servicio.color}14`,
                border: `1px solid ${servicio.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', marginBottom: '20px',
              }}>
                {servicio.icono}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}>
                {servicio.titulo}
              </h3>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}>
                {servicio.descripcion}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {servicio.puntos.map(punto => (
                  <li key={punto} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px',
                  }}>
                    <span style={{ color: servicio.color, fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>▸</span>
                    {punto}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Badge de cobertura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 28px',
            borderRadius: '40px',
            background: 'rgba(0, 245, 255, 0.06)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
          }}>
            <span style={{ fontSize: '1.1rem' }}>📍</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              Cobertura: Ciudad de México · Estado de México
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
