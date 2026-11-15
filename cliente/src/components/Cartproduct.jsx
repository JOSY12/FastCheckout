import { useState } from 'react'
import { LuMinus, LuPlus, LuTrash2, LuFootprints } from 'react-icons/lu'
import { Carrito } from '../context/Carrito'
import { precioFormateado } from '../utils/format'
const Cartproduct = ({
  id,
  categoria,
  compañia,
  img,
  precio,
  nombre,
  cantidad,
  disabled
}) => {
  const { quitar, aumentar, restar } = Carrito()
  const [imagenFallida, setImagenFallida] = useState(false)
  return (
    <article className="cart-item">
      <div className="cart-item-image">
        {imagenFallida ? (
          <LuFootprints />
        ) : (
          <img src={img} alt={nombre} onError={() => setImagenFallida(true)} />
        )}
      </div>
      <div className="cart-item-info">
        <span className="product-category">
          {compañia} / {categoria}
        </span>
        <h3>{nombre}</h3>
        <strong>{precioFormateado(precio * cantidad)}</strong>
        <div className="cart-item-controls">
          <div className="quantity-control">
            <button
              disabled={disabled || cantidad <= 1}
              aria-label={'Restar una unidad de ' + nombre}
              onClick={() => restar(id)}
            >
              <LuMinus />
            </button>
            <span aria-live="polite" aria-label="Cantidad">
              {cantidad}
            </span>
            <button
              disabled={disabled}
              aria-label={'Añadir una unidad de ' + nombre}
              onClick={() => aumentar(id)}
            >
              <LuPlus />
            </button>
          </div>
          <button
            className="remove-button"
            disabled={disabled}
            aria-label={'Eliminar ' + nombre}
            onClick={() => quitar(id)}
          >
            <LuTrash2 />
          </button>
        </div>
      </div>
    </article>
  )
}
export default Cartproduct
