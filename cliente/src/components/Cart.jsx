import { Carrito } from '../context/Carrito'
import Cartproduct from './Cartproduct'
import { useEffect, useState } from 'react'
const Cart = () => {
  const { carrito, quitar } = Carrito()

  const [total, settotal] = useState()

  useEffect(() => {
    const total = carrito.reduce(
      (acc, { newPrice, cantidad }) => acc + newPrice * cantidad,
      0
    )
    settotal(total)
  }, [carrito])
  return (
    <>
      <div className=' '>
        <div className='bg-gray-100 top-12 absolute  z-20 right-0'>
          <div className=' bg-gray-200    p-4    rounded-md  lg:w-[600px] md:w-[600px]  '>
            <div className='     md:flex  '>
              <div className='rounded-lg   flex-col pt-4 overflow-y-scroll   md:max-h-[600px]   lg:max-h-[600px]  w-full '>
                {/* aqui comienzan las card
                 */}
                {carrito?.map(producto => (
                  <Cartproduct
                    quitar={quitar}
                    key={producto.id}
                    {...producto}
                  />
                ))}
              </div>
            </div>

            <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0  '>
              <hr className='my-4' />
              <div className='flex justify-b  place-content-between'>
                <p className='text-lg font-bold'>Total</p>
                <div className=''>
                  <p className='mb-1 text-lg font-bold'>${total} </p>
                </div>
              </div>

              <button
                disabled={carrito.length === 0}
                className={`mt-6 w-full   rounded-md disabled:bg-white bg-black   py-1.5 font-medium text-blue-50    `}
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
