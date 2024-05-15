import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Carrito } from '../context/Carrito'
import { useSearchParams } from 'react-router-dom'
const Exito = () => {
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
        vaciarcarro()

        navigate('/', { replace: true })
      }, 5000)
      return () => clearTimeout(timeout)
    }
    vaciarcarro()
  }, [navigate, paymentId, status, paymentType, vaciarcarro])

  // Mostrar el estado de carga si se está verificando la presencia de parámetros en la URL
  // Renderizar el contenido de la página de éxito solo si los parámetros están presentes
  return paymentId && status && paymentType ? (
    <div className='bg-gray-100 '>
      <div className='bg-white p-6 min-h-screen place-content-center md:mx-auto'>
        <svg
          viewBox='0 0 24 24'
          className='text-green-600 w-16 h-16 mx-auto my-6'
        >
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Pago exitoso!
          </h3>
          <p className='text-gray-600 my-2 '>Datos de compra</p>
          <p>id de pago:{paymentId} </p>
          <p>Metodo de pago:{paymentType} </p>

          <p>estado:{status} </p>

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

export default Exito
