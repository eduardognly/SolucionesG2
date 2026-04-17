import './App.css'
import BarraNavegacion from './components/BarraNavegacion'
import Inicio from './components/Inicio'
import SobreMi from './components/SobreMi'
import Habilidades from './components/Habilidades'
import Proyectos from './components/Proyectos'
import Contacto from './components/Contacto'

function App() {
  return (
    <div className="app">
      <BarraNavegacion />
      <main>
        <Inicio />
        <SobreMi />
        <Habilidades />
        <Proyectos />
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

export default App
