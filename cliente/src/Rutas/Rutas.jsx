import Paginaspublicas from './Paginaspublicas'
import { createBrowserRouter } from 'react-router-dom'
import MainContainer from '../components/MainContainer'
import ErrorPagina from '../components/ErrorPagina'
import Exito from '../components/Exito'
import Fallo from '../components/Fallo'

export const Rutas = createBrowserRouter([
  {
    path: '/',
    element: <Paginaspublicas />,
    errorElement: <ErrorPagina />,
    children: [
      {
        index: true,
        element: <MainContainer />
      },
      {
        path: 'exito',
        element: <Exito />
      },
      {
        path: 'fallo',
        element: <Fallo />
      }
    ]
  }
])
