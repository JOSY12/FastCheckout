import { useEffect, useRef } from 'react'
import { LuX, LuShoppingBag, LuArrowRight, LuLock } from 'react-icons/lu'
import { Carrito } from '../context/Carrito'
import { precioFormateado } from '../utils/format'
import Cartproduct from './Cartproduct'
const Cart = ({ onClose }) => {
  const dialog = useRef(null)
  const { carrito, comprartodo, procesando } = Carrito()
  const total = carrito.reduce(
    (acc, { precio, cantidad }) => acc + precio * cantidad,
    0
  )
  const cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
  useEffect(() => {
    dialog.current.showModal()
  }, [])
  return (
    <dialog
      ref={dialog}
      className="cart-dialog"
      aria-labelledby="cart-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="cart-header">
        <div>
          <span className="eyebrow">BUENAS ELECCIONES</span>
          <h2 id="cart-title">
            TU CARRITO<span className="accent-text">.</span>{' '}
            <span className="cart-count">{cantidad}</span>
          </h2>
        </div>
        <button
          className="icon-button"
          aria-label="Cerrar carrito"
          onClick={onClose}
        >
          <LuX />
        </button>
      </div>
      {carrito.length ? (
        <>
          <div className="cart-items">
            {carrito.map((producto) => (
              <Cartproduct
                key={producto.id}
                {...producto}
                disabled={procesando}
              />
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>
                TOTAL{' '}
                <small>
                  {cantidad} {cantidad === 1 ? 'artículo' : 'artículos'}
                </small>
              </span>
              <strong>
                {precioFormateado(total)} <small>USD</small>
              </strong>
            </div>
            <button
              className="button button-accent full-width checkout-button"
              disabled={procesando}
              onClick={comprartodo}
            >
              {procesando ? 'Preparando checkout…' : 'Ir a pagar'}
              {procesando ? <span className="spinner" /> : <LuArrowRight />}
            </button>
            <p className="checkout-note">
              <LuLock /> Checkout con Stripe · Entorno de demostración
            </p>
            <button className="text-button" onClick={onClose}>
              Seguir explorando
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state cart-empty">
          <LuShoppingBag />
          <span className="eyebrow">ESPACIO PARA ALGO BUENO</span>
          <h3>
            Tu próximo par
            <br />
            te está esperando.
          </h3>
          <p>Explora la colección y añade tus favoritos.</p>
          <button className="button button-accent" onClick={onClose}>
            Explorar colección <LuArrowRight />
          </button>
        </div>
      )}
    </dialog>
  )
}
export default Cart
