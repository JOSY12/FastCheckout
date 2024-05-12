import Product from './Product'
import { Productos } from '../context/Productos.js'
import Pagination from './Pagination'
import { useState } from 'react'

const MainContainer = () => {
  const { productos } = Productos()

  const [paginaActiva, setpaginaActiva] = useState(1)
  const [productosenpagina] = useState(8)
  const [productostotales] = useState(productos.length)
  const lastProductIndex = paginaActiva * productosenpagina
  const firstProductIndex = lastProductIndex - productosenpagina

  return (
    <>
      <h1 className='text-center text-3xl font-bold'>Ecommerce simple</h1>
      <section className='  bg-gray-100  place-content-center min-h-screen'>
        <div className='m-auto grid max-w-6xl  grid-cols-1 gap-4  s sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {productos
            ?.slice(firstProductIndex, lastProductIndex)
            .map((producto, i) => {
              return <Product key={i} {...producto} />
            })}
        </div>
      </section>
      <Pagination
        productosenpagina={productosenpagina}
        totalProducts={productostotales}
        setpaginaActiva={setpaginaActiva}
        paginaActiva={paginaActiva}
      />
    </>
  )
}

export default MainContainer
