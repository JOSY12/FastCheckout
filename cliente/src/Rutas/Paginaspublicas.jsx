import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'

const Paginaspublicas = () => {
  return (
    <>
      <Navbar />
      <Toaster position='top-center' expand={false} richColors />
      {useNavigation().state === 'loading' && (
        <div className='h-screen bg-white'>
          <div className='flex justify-center items-center h-full'>
            <img
              className='h-16 w-16'
              src='https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'
              alt=''
            ></img>
          </div>
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  )
}

export default Paginaspublicas
