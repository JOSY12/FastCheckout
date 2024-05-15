import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Carrito } from '../context/Carrito'
import { useSearchParams } from 'react-router-dom'
import { MdOutlineErrorOutline } from 'react-icons/md'

const Fallo = () => {
  const vaciarcarro = Carrito((state) => state.vaciarcarro)

  const navigate = useNavigate()
  const [queryParameters] = useSearchParams()
  const paymentId = queryParameters.get('payment_id')
  const status = queryParameters.get('status')
  const paymentType = queryParameters.get('payment_type')

  useEffect(() => {
    // Verificar si los parámetros necesarios están presentes
    if (!paymentId || !status || !paymentType) {
      navigate('/', { replace: true }) // Redirigir al usuario a otra página si faltan parámetros
    } else {
      // Reemplazar la entrada actual en el historial
      window.history.replaceState(null, '', '/') // Evitar que el usuario regrese a esta página
      // Redirigir después de 5 segundos
      const timeout = setTimeout(() => {
        navigate('/', { replace: true })
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [navigate, paymentId, status, paymentType, vaciarcarro])

  // Mostrar el estado de carga si se está verificando la presencia de parámetros en la URL
  // Renderizar el contenido de la página de éxito solo si los parámetros están presentes
  return paymentId && status && paymentType ? (
    <div className='bg-gray-100 '>
      <div className='bg-white p-6 min-h-screen place-content-center md:mx-auto'>
        <MdOutlineErrorOutline className='text-red-600 w-16 h-16 mx-auto my-6' />

        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Error en el pago!
          </h3>
          <p className='text-gray-600 my-2 '>Compra cancelada</p>

          <div className='py-10  flex  flex-col place-content-center   items-center text-center '>
            <p>redirigiendo.....</p>
            <img
              className='h-16 w-16'
              src='https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'
              alt=''
            ></img>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Fallo
