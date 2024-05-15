import { useEffect, useState } from 'react'
import { Carrito } from '../context/Carrito.js'
const Product = ({ id, categoria, compañia, img, precio, nombre }) => {
  const { agregar, carrito } = Carrito()
  const [agregado, setAgregado] = useState(false)

  useEffect(() => {
    if (carrito.find((producto) => producto.id === id)) {
      setAgregado(true)
    } else {
      setAgregado(false)
    }
  }, [carrito, id])

  return (
    // <article className='rounded-xl h-60 w-60 m-2 bg-white p-3 shadow-lg hover:shadow-xl z-10     hover:scale-105 duration-300 '>

    <article className='rounded-xl    w-[350px] md:w-[350px]  lg:w-[300px]  m-2 bg-white p-3 shadow-lg hover:shadow-xl z-10     hover:scale-105 duration-300 '>
      <a>
        <div className='   select-none  flex place-content-center    '>
          <img src={img} alt='Hotel Photo' className=' h-[200px] w-[300px] ' />
        </div>

        <div className='mt-1 p-2'>
          <h2 className='text-slate-700'>{nombre}</h2>
          <div className='flex items-center justify-between'>
            <p className='mt-1 text-sm text-slate-400'>{categoria}</p>

            <p className='mt-1 text-sm text-slate-400'>{compañia}</p>
          </div>

          <p className='text-lg font-bold text-blue-500'>${precio * 10}</p>

          <div className=''>
            <button
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
              disabled={agregado}
              className={`text-sm w-full ${
                agregado ? 'bg-green-600  ' : ''
              } flex items-center space-x-1.5   bg-black px-4 py-1.5 text-white duration-100    `}
            >
              {agregado ? 'Agregado al carrito' : '  Agregar al carrito'}
            </button>
          </div>
        </div>
      </a>
    </article>
  )
}

export default Product
