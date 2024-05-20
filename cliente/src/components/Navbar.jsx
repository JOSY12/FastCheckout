import { LuShoppingCart } from 'react-icons/lu'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoAlertCircleSharp } from 'react-icons/io5'

import { LiaCcVisa } from 'react-icons/lia'

import Cart from './Cart'
const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  return (
    <>
      <nav className=' select-none  z-30 w-full border-b border-gray-200 bg-white py-2.5 sm:px-4'>
        <div className='container  flex  mx-auto flex-wrap   justify-between'>
          <a href='/' className='flex flex-col ml-6  '>
            <h1 className='self-center whitespace-nowrap text-xl font-semibold'>
              Fastcheckout
            </h1>
            <h4 className='self-center '>payment Tester</h4>
          </a>
          {/* ///guia de compra */}

          <div className='       '>
            <div className='    text-center  '>
              <dialog id='my_modal_1' className='  rounded-lg    '>
                <div className='grid grid-cols-1    '>
                  <div className='   '>
                    <ul className='m-4 sm:p-6  font-bold flex flex-col text-center  place-content-center justify-center items-center self-center '>
                      <li>
                        <p> Paso 1:</p>
                        agrega items al carrito y procede con el pago
                        <br></br>
                      </li>

                      <br></br>
                      <li>
                        <p> Paso 2:</p>
                        ingresa un correo electrónico y nombre, pueden ser
                        aletarios
                        <br></br>
                      </li>
                      <br></br>
                      <li>
                        <p> 3:</p>
                        ingresa la informacion de la tarjeta
                      </li>
                      <br></br>
                    </ul>

                    <div className='space-y-2 '>
                      <div className='w-[350px] h-56  m-auto bg-black rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110'>
                        <div className='w-full px-8 absolute top-8'>
                          <div className='flex justify-between'>
                            <div className=''>
                              <p className='font-light text-left'>
                                Nombre-Titular
                              </p>
                              <h1 className='font-medium tracking-widest  text-left'>
                                cualquier
                              </h1>
                            </div>

                            <LiaCcVisa className='text-3xl h-16 w-16' />
                          </div>
                          <div className='pt-1'>
                            <p className='font-light text-left'>Número</p>
                            <h1 className='font-medium tracking-more-wider text-left'>
                              4242 4242 4242 4242
                            </h1>
                          </div>
                          <div className='pt-6 pr-6'>
                            <div className='flex justify-between'>
                              <div className=''>
                                <h1 className='font-light text-xs  '>
                                  Fecha de caducidad
                                </h1>
                                <p className='font-medium tracking-wider text-sm'>
                                  3/33
                                </p>
                              </div>

                              <div className=''>
                                <p className='font-light text-xs'>
                                  Código de seguridad(CVV)
                                </p>
                                <h1 className='font-bold tracking-more-wider text-sm'>
                                  123
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-action justify-center m-4'>
                    <form method='dialog'>
                      <button className='btn p-4 btn-wide rounded-lg bg-green-500  font-semibold'>
                        Entendido
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          {/* /fin guia de compra */}

          <div className='mt-2   sm:flex '>
            <button
              className='  text-2xl  mr-4   '
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              <IoAlertCircleSharp className='text-blue-600' />
            </button>
            <button onClick={() => setNavbar(!navbar)} className='pr-6'>
              {navbar ? (
                <IoMdClose className='h-6 w-6' />
              ) : (
                <LuShoppingCart className='h-6 w-6 ' />
              )}
            </button>
          </div>
        </div>
      </nav>
      {navbar && <Cart />}
    </>
  )
}

export default Navbar
