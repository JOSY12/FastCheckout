import { useState } from 'react'
import { LuPlus, LuCheck, LuFootprints } from 'react-icons/lu'
import { Carrito } from '../context/Carrito.js'
import { precioFormateado } from '../utils/format'
const Product = ({ id, categoria, compañia, img, precio, nombre }) => {
  const agregar = Carrito((state) => state.agregar)
  const agregado = Carrito((state) =>
    state.carrito.some((producto) => producto.id === id)
  )
  const [imagenFallida, setImagenFallida] = useState(false)
  return (
    <article className={'product-card ' + (agregado ? 'is-added' : '')}>
      <div className="product-image">
        <span className="product-brand">{compañia}</span>
        <span className="product-number">/ {String(id).padStart(2, '0')}</span>
        {imagenFallida ? (
          <div className="image-fallback">
            <LuFootprints />
            <span>{nombre}</span>
          </div>
        ) : (
          <img
            src={img}
            alt={nombre}
            loading="lazy"
            onError={() => setImagenFallida(true)}
          />
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{categoria}</span>
        <h3>{nombre}</h3>
        <div className="product-price">
          <strong>{precioFormateado(precio)}</strong>
          <span>USD</span>
        </div>
        <button
          className={'button add-button ' + (agregado ? 'added' : '')}
          disabled={agregado}
          onClick={() =>
            agregar({
              id,
              categoria,
              compañia,
              img,
              precio,
              nombre,
              cantidad: 1
            })
          }
        >
          {agregado ? 'En tu carrito' : 'Añadir al carrito'}
          {agregado ? <LuCheck /> : <LuPlus />}
        </button>
      </div>
    </article>
  )
}
export default Product
