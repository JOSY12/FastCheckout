import { Link, useRouteError } from 'react-router-dom'
const ErrorPagina = () => {
  const error = useRouteError()
  return (
    <div className=' min-h-screen flex flex-col gap-4 place-content-center items-center'>
      <h1 className='text-3xl text-red-600'>Error {error.status}</h1>
      <h1 className='text-3xl'> Pagina no encontrada!</h1>
      <Link to='/'>
        <button className='border-2 border-black p-2 rounded-md text-2xl'>
          Volver
        </button>
      </Link>
    </div>
  )
}

export default ErrorPagina
