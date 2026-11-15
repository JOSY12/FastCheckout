import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'
import { Tema } from '../context/Tema'
const Paginaspublicas = () => {
  const navigation = useNavigation()
  const tema = Tema((state) => state.tema)
  return (
    <>
      <Navbar />
      <Toaster
        position="bottom-center"
        expand={false}
        richColors
        theme={tema}
      />
      {navigation.state === 'loading' && (
        <div className="route-loading" role="status">
          <span className="spinner" /> Cargando…
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  )
}
export default Paginaspublicas
