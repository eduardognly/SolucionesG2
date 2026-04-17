import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type Categoria = 'Frontend' | 'Backend' | 'Bases de Datos'

interface Habilidad {
  nombre: string
  icono: string
  descripcion: string
}

const datosHabilidades: Record<Categoria, Habilidad[]> = {
  Frontend: [
    {
      nombre: 'React',
      icono: '⚛️',
      descripcion: 'Biblioteca para construir interfaces de usuario modernas e interactivas',
    },
    {
      nombre: 'Angular',
      icono: '🔴',
      descripcion: 'Framework completo de Google para aplicaciones web empresariales',
    },
    {
      nombre: 'JavaScript',
      icono: '⚡',
      descripcion: 'Lenguaje de programación principal de la web, presente en todo sitio',
    },
    {
      nombre: 'TypeScript',
      icono: '🔷',
      descripcion: 'JavaScript con tipado estático para código más robusto y mantenible',
    },
    {
      nombre: 'HTML5 / CSS3',
      icono: '🎨',
      descripcion: 'Estructura y diseño visual de las páginas y aplicaciones web',
    },
  ],
  Backend: [
    {
      nombre: 'Java',
      icono: '☕',
      descripcion: 'Lenguaje robusto y seguro, estándar en sistemas bancarios y corporativos',
    },
    {
      nombre: 'Spring Boot',
      icono: '🍃',
      descripcion: 'Framework Java para construir APIs y servicios empresariales de alta disponibilidad',
    },
    {
      nombre: 'Node.js',
      icono: '🟩',
      descripcion: 'Plataforma para crear servidores y APIs rápidas con JavaScript',
    },
    {
      nombre: 'REST APIs',
      icono: '🔌',
      descripcion: 'Diseño e implementación de servicios web que conectan aplicaciones entre sí',
    },
    {
      nombre: 'Microservicios',
      icono: '🧩',
      descripcion: 'Arquitectura que divide aplicaciones grandes en piezas pequeñas e independientes',
    },
  ],
  'Bases de Datos': [
    {
      nombre: 'MySQL',
      icono: '🐬',
      descripcion: 'Base de datos relacional ampliamente usada en aplicaciones web y empresariales',
    },
    {
      nombre: 'PostgreSQL',
      icono: '🐘',
      descripcion: 'Base de datos avanzada ideal para sistemas que requieren alta integridad de datos',
    },
    {
      nombre: 'Sybase',
      icono: '🏦',
      descripcion: 'Sistema de base de datos crítico para la industria bancaria y financiera',
    },
    {
      nombre: 'SQL Avanzado',
      icono: '📋',
      descripcion: 'Consultas complejas, optimización y procedimientos almacenados',
    },
    {
      nombre: 'Modelado de Datos',
      icono: '🗂️',
      descripcion: 'Diseño de estructuras de datos eficientes para cualquier tipo de negocio',
    },
  ],
}

const categorias: Categoria[] = ['Frontend', 'Backend', 'Bases de Datos']

const coloresCategorias: Record<Categoria, string> = {
  Frontend:         '#00f5ff',
  Backend:          '#bf00ff',
  'Bases de Datos': '#00ff88',
}

const iconosCategorias: Record<Categoria, string> = {
  Frontend:         '🖥️',
  Backend:          '⚙️',
  'Bases de Datos': '🗄️',
}

function TarjetaHabilidad({ habilidad, color, indice, estaEnVista }: {
  habilidad: Habilidad
  color: string
  indice: number
  estaEnVista: boolean
}) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 24 }}
      animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: indice * 0.07 }}
      whileHover={{ y: -4, borderColor: color }}
      style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        cursor: 'default',
        transition: 'border-color 0.25s ease',
      }}
    >
      {/* Círculo con ícono */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: `${color}14`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.4rem',
        flexShrink: 0,
      }}>
        {habilidad.icono}
      </div>

      <div>
        <h3 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}>
          {habilidad.nombre}
        </h3>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}>
          {habilidad.descripcion}
        </p>
      </div>

      {/* Línea de acento */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '24px', right: '24px',
        height: '1px',
        background: `linear-gradient(to right, ${color}30, transparent)`,
      }} />
    </motion.div>
  )
}

export default function Habilidades() {
  const [activo, setActivo] = useState<Categoria>('Frontend')
  const ref = useRef<HTMLDivElement>(null)
  const estaEnVista = useInView(ref, { once: true, margin: '-80px' })

  const manejarCambioCategoria = (categoria: Categoria) => {
    setActivo(categoria)
  }

  return (
    <section id="skills" className="section grid-bg">
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Tecnologías <span className="highlight">que usamos</span>
        </motion.h2>

        {/* Pestañas de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={estaEnVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          {categorias.map(cat => {
            const estaActivo = activo === cat
            const color = coloresCategorias[cat]
            return (
              <motion.button
                key={cat}
                onClick={() => manejarCambioCategoria(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  borderRadius: '40px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: `1.5px solid ${estaActivo ? color : 'rgba(255,255,255,0.08)'}`,
                  background: estaActivo ? `${color}18` : 'transparent',
                  color: estaActivo ? color : 'var(--text-muted)',
                  boxShadow: estaActivo ? `0 0 20px ${color}30` : 'none',
                }}
              >
                <span>{iconosCategorias[cat]}</span>
                {cat}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Cuadrícula de habilidades */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}>
              {datosHabilidades[activo].map((habilidad, i) => (
                <TarjetaHabilidad
                  key={habilidad.nombre}
                  habilidad={habilidad}
                  color={coloresCategorias[activo]}
                  indice={i}
                  estaEnVista={estaEnVista}
                />
              ))}
            </div>

            {/* Texto de contexto inferior */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                textAlign: 'center',
                marginTop: '36px',
                fontSize: '0.88rem',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {'// '}
              {activo === 'Backend' && 'Desarrollamos la lógica del negocio y los servicios que mueven todo'}
              {activo === 'Bases de Datos' && 'Diseñamos y administramos los almacenes de información de cada sistema'}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Insignias de tecnologías */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={estaEnVista ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            marginTop: '64px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {[
            'React', 'Angular', 'JavaScript', 'TypeScript', 'Java',
            'Spring Boot', 'Node.js', 'MySQL', 'PostgreSQL', 'Sybase',
            'REST APIs', 'HTML5', 'CSS3', 'Git', 'SQL',
          ].map((tech, i) => (
            <motion.span
              key={tech}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={estaEnVista ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.04 }}
              whileHover={{ scale: 1.07 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
