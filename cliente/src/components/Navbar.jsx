import { LuShoppingCart } from 'react-icons/lu'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import Cart from './Cart'
const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  return (
    <>
      <nav className=' select-none    z-30 w-full border-b border-gray-200 bg-white py-2.5 sm:px-4'>
        <div className='container  flex  mx-auto flex-wrap   justify-between'>
          <a href='/' className='flex  '>
            <h1 className='self-center whitespace-nowrap text-xl font-semibold'>
              Fast checkout
            </h1>
          </a>
          <div className='mt-2 sm:mt-0 sm:flex md:order-2'>
            <button onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <IoMdClose className='h-6 w-6' />
              ) : (
                <LuShoppingCart className='h-6 w-6' />
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
