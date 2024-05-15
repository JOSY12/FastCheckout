import { LuShoppingCart } from 'react-icons/lu'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoAlertCircleSharp } from 'react-icons/io5'
import { FaCcMastercard } from 'react-icons/fa'

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
                    <ul className='m-4 sm:p-12  font-bold flex flex-col text-center  place-content-center justify-center items-center self-center '>
                      <li>
                        <p> Paso 1:</p>
                        inicia sesion con una de estas cuentas, compra algo algo
                        mayor a 800$ <br></br>
                        <br></br>
                      </li>
                      <div className=' w-full   overflow-x-auto  '>
                        <table className=' w-full    '>
                          <thead>
                            <tr className='font-bold text-white  bg-blue-700'>
                              <th></th>
                              <th>Pais</th>
                              <th>Cuenta de usuario</th>
                              <th>Contraseña</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>1</th>
                              <td>Colombia</td>
                              <td>TESTMDQSOMB8</td>
                              <td>ce69d7c5#4f96#42fc#</td>
                            </tr>

                            <tr className='hover'>
                              <th>2</th>
                              <td>Perú</td>
                              <td>TETE6237853</td>
                              <td>a50a413c#732a#45aa#</td>
                            </tr>

                            <tr>
                              <th>3</th>
                              <td>México</td>
                              <td>TETE4576700</td>
                              <td>3d677b13#92c4#4b4c#</td>
                            </tr>
                            <tr>
                              <th>4</th>
                              <td>Argentina</td>
                              <td>TETE3160622</td>
                              <td>ce69d7c5#4f96#42fc#</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <br></br>
                      <li>
                        <p> Paso 2:</p>
                        elige tu metodo de pago,tarjeta,saldo,etc..
                      </li>
                      <br></br>
                      <li>
                        <p> Extra:</p>
                        Puedes usar esta tarjeta de pago para hacer compras sin
                        limites.
                      </li>
                      <br></br>
                    </ul>

                    <div className='space-y-16 '>
                      <div className='w-[350px] h-56  m-auto bg-black rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110'>
                        <div className='w-full px-8 absolute top-8'>
                          <div className='flex justify-between'>
                            <div className=''>
                              <p className='font-light text-left'>
                                Nombre-Titular
                              </p>
                              <h1 className='font-medium tracking-widest  text-left'>
                                APRO
                              </h1>
                            </div>
                            <div className=''>
                              <p className='font-light text-left'>
                                Identificacion (DNI,CC,NIT)
                              </p>
                              <h1 className='font-medium tracking-widest  text-left'>
                                123456789
                              </h1>
                            </div>
                            <FaCcMastercard className='text-3xl h-16 w-16' />
                          </div>
                          <div className='pt-1'>
                            <p className='font-light text-left'>Número</p>
                            <h1 className='font-medium tracking-more-wider text-left'>
                              5254 1336 7440 3564
                            </h1>
                          </div>
                          <div className='pt-6 pr-6'>
                            <div className='flex justify-between'>
                              <div className=''>
                                <h1 className='font-light text-xs  '>
                                  Fecha de caducidad
                                </h1>
                                <p className='font-medium tracking-wider text-sm'>
                                  11/25
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
