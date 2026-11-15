import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LuArrowUpRight,
  LuArrowRight,
  LuMoon,
  LuSun,
  LuShoppingBag,
  LuX,
  LuZap
} from 'react-icons/lu'
import { Carrito } from '../context/Carrito'
import { Tema } from '../context/Tema'
import Cart from './Cart'
const Navbar = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const guia = useRef(null)
  const cantidad = Carrito((state) =>
    state.carrito.reduce((sum, item) => sum + item.cantidad, 0)
  )
  const { tema, cambiarTema } = Tema()
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <button
        className="announcement"
        onClick={() => guia.current.showModal()}
        aria-label="Cómo comprar: abrir la guía de prueba"
      >
        <span className="status-dot" />
        <span className="announcement-copy">
          UN PROYECTO PARA EXPLORAR. UN CHECKOUT PARA PROBAR.
        </span>
        <span className="announcement-end">
          GUÍA DEMO <LuArrowUpRight />
        </span>
        <span className="announcement-mobile">
          TIENDA DEMO / GUÍA DE COMPRA ↗
        </span>
      </button>
      <header className="site-header">
        <nav className="header-inner" aria-label="Navegación principal">
          <Link to="/" className="brand" aria-label="Fastcheckout, inicio">
            <span className="brand-symbol">
              <LuZap />
            </span>
            <span>
              fastcheckout<span className="brand-period">.</span>
            </span>
          </Link>
          <div className="nav-links">
            <a href="/#catalogo">
              Catálogo <LuArrowUpRight />
            </a>
            <button onClick={() => guia.current.showModal()}>
              Cómo comprar <LuArrowUpRight />
            </button>
          </div>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={cambiarTema}
              aria-label={
                tema === 'dark' ? 'Activar tema día' : 'Activar tema noche'
              }
            >
              <LuSun className={tema === 'light' ? 'theme-active' : ''} />
              <span className="theme-divider" />
              <LuMoon className={tema === 'dark' ? 'theme-active' : ''} />
            </button>
            <button
              className="button cart-toggle"
              onClick={() => setCarritoAbierto(true)}
              aria-haspopup="dialog"
            >
              <LuShoppingBag />
              <span>Carrito</span>
              <span className="cart-count">{cantidad}</span>
            </button>
          </div>
        </nav>
      </header>
      <dialog
        ref={guia}
        className="guide-dialog"
        aria-labelledby="guide-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) guia.current.close()
        }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">CHECKOUT / GUÍA RÁPIDA</span>
          <button
            className="icon-button"
            aria-label="Cerrar guía"
            onClick={() => guia.current.close()}
          >
            <LuX />
          </button>
        </div>
        <h2 id="guide-title">
          Pruébalo.
          <br />
          <span className="accent-text">Así de fácil.</span>
        </h2>
        <p className="muted">
          Esta tienda es una demo de pagos. Usa los datos de prueba de Stripe.
        </p>
        <ol className="guide-steps">
          <li>
            <span>01</span>
            <div>
              <strong>Elige tus favoritos.</strong>
              <p>Añade productos y ajusta las cantidades en el carrito.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Ve al checkout.</strong>
              <p>Completa un nombre y correo de prueba.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Prueba el pago.</strong>
              <p>Usa la tarjeta de prueba y una fecha futura.</p>
            </div>
          </li>
        </ol>
        <div className="test-card">
          <span>STRIPE / TARJETA DE PRUEBA</span>
          <strong>4242 4242 4242 4242</strong>
          <div>
            <span>VENCE / 03/33</span>
            <span>CVV / 123</span>
          </div>
        </div>
        <button
          className="button button-accent full-width"
          onClick={() => guia.current.close()}
        >
          Entendido, vamos <LuArrowRight />
        </button>
      </dialog>
      {carritoAbierto && <Cart onClose={() => setCarritoAbierto(false)} />}
    </>
  )
}
export default Navbar
