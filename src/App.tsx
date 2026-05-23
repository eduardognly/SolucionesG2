import { Routes, Route } from 'react-router-dom'
import './App.css'
import BarraNavegacion from './components/BarraNavegacion'
import Inicio from './components/Inicio'
import SobreMi from './components/SobreMi'
import Habilidades from './components/Habilidades'
import Proyectos from './components/Proyectos'
import Servicios from './components/Servicios'
import Contacto from './components/Contacto'
import Restaurantes from './pages/Restaurantes'
import Tiendas from './pages/Tiendas'
import Pymes from './pages/Pymes'

function PaginaInicio() {
  return (
    <div className="app">
      <BarraNavegacion />
      <main>
        <Inicio />
        <SobreMi />
        <Habilidades />
        <Proyectos />
        <Servicios />
        <Contacto />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">{'<SolucionesG2 />'}</div>
          <p className="footer-text">
            Crafted with React · TypeScript · Three.js · GSAP
          </p>
          <p className="footer-copy">© 2025 Soluciones G2. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/restaurantes" element={<Restaurantes />} />
      <Route path="/tiendas" element={<Tiendas />} />
      <Route path="/pymes" element={<Pymes />} />
    </Routes>
  )
}

export default App
