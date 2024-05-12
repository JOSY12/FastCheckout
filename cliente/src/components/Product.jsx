import { useEffect, useState } from 'react'
import { Carrito } from '../context/Carrito.js'
const Product = ({ id, category, company, img, newPrice, title }) => {
  const { agregar, carrito } = Carrito()
  const [agregado, setAgregado] = useState(false)

  useEffect(() => {
    if (carrito.find(producto => producto.id === id)) {
      setAgregado(true)
    } else {
      setAgregado(false)
    }
  }, [carrito, id])

  return (
    <article className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl z-10   h-full  hover:scale-105 duration-300 '>
      <a>
        <div className='    w-full h-full max-h-[100px]   '>
          <img src={img} alt='Hotel Photo' className=' h-full  w-full' />
        </div>

        <div className='mt-1 p-2'>
          <h2 className='text-slate-700'>{title}</h2>
          <div className='flex items-center justify-between'>
            <p className='mt-1 text-sm text-slate-400'>{company}</p>
            <p className='mt-1 text-sm text-slate-400'>{category}</p>
          </div>

          <p className='text-lg font-bold text-blue-500'>${newPrice}</p>

          <div className=''>
            <button
              onClick={() =>
                agregar({
                  id,
                  category,
                  company,
                  img,
                  newPrice,
                  title,
                  cantidad: 1
                })
              }
              disabled={agregado}
              className={`text-sm w-full ${
                agregado ? 'bg-red-400  ' : ''
              } flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100    `}>
              {agregado ? 'Agregado al carrito' : '  Agregar al carrito'}
            </button>
          </div>
        </div>
      </a>
    </article>
  )
}

export default Product
