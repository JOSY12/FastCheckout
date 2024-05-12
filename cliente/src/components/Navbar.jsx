import { LuShoppingCart } from 'react-icons/lu'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import Cart from './Cart'
const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  return (
    <>
      <nav className='  z-30 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4'>
        <div className='container mx-auto flex max-w-6xl flex-wrap items-center justify-between'>
          <a href='/' className='flex items-center'>
            <span className='self-center whitespace-nowrap text-xl font-semibold'>
              Fast checkout
            </span>
          </a>
          <div className='mt-2 sm:mt-0 md:order-2 '>Home</div>
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
