import Product from './Product'
import { Productos } from '../context/Productos.js'
import Pagination from './Pagination'
import { useState } from 'react'

const MainContainer = () => {
  const { productos, filtros } = Productos()
  const [paginaActiva, setpaginaActiva] = useState(1)
  const [productosporpagina] = useState(10)
  const lastProductIndex = paginaActiva * productosporpagina
  const firstProductIndex = lastProductIndex - productosporpagina

  // Filtramos los productos basados en los filtros de marca y categoría
  const Productosfiltrados = productos.filter(
    (product) =>
      (filtros.compañia === '' || product.compañia === filtros.compañia) &&
      (filtros.categoria === '' || product.categoria === filtros.categoria) &&
      (filtros.nombre === '' ||
        product.nombre.toLowerCase().includes(filtros.nombre))
  )

  return (
    <>
      {/* <h1 className='text-center text-3xl font-bold'>Ecommerce simple</h1> */}
      {/* //// */}

      {Productosfiltrados.length ? (
        <section className='    bg-gray-100 mt-4  min-h-screen '>
          <div className='   flex    flex-wrap place-content-center sm:gap-4    '>
            {Productosfiltrados?.slice(firstProductIndex, lastProductIndex).map(
              (producto, i) => {
                return <Product key={i} {...producto} />
              }
            )}
          </div>
        </section>
      ) : (
        <section className=' w-full flex  flex-col bg-black text-white text-center    place-content-center min-h-screen '>
          <div className='  '>no se encontraron productos...</div>
        </section>
      )}

      <Pagination
        productosporpagina={productosporpagina}
        productostotales={Productosfiltrados.length}
        setpaginaActiva={setpaginaActiva}
        paginaActiva={paginaActiva}
      />
    </>
  )
}

export default MainContainer
