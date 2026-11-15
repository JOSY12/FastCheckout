import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LuCheck, LuArrowRight } from 'react-icons/lu'
import { Carrito } from '../context/Carrito'
const Exito = () => {
  const vaciarcarro = Carrito((state) => state.vaciarcarro)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const paymentId = params.get('payment_id')
  const status = params.get('status')
  const paymentType = params.get('payment_type')
  useEffect(() => {
    const timeout = setTimeout(() => {
      vaciarcarro()
      navigate('/', { replace: true })
    }, 5000)
    return () => clearTimeout(timeout)
  }, [navigate, vaciarcarro])
  return (
    <main id="contenido" className="result-page page-width">
      <section className="result-card">
        <span className="result-icon">
          <LuCheck />
        </span>
        <span className="eyebrow">CHECKOUT / COMPLETADO</span>
        <h1>
          ¡BUEN
          <br />
          <span className="accent-text">PASO!</span>
        </h1>
        <p>Pago exitoso. Gracias por probar Fastcheckout.</p>
        {paymentId && status && paymentType && (
          <dl className="payment-details">
            <div>
              <dt>ID del pago</dt>
              <dd>{paymentId}</dd>
            </div>
            <div>
              <dt>Método</dt>
              <dd>{paymentType}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>{status}</dd>
            </div>
          </dl>
        )}
        <p className="redirect-note">
          <span className="spinner" /> Volviendo al catálogo en unos segundos…
        </p>
        <Link className="button button-accent" to="/" onClick={vaciarcarro}>
          Volver al catálogo <LuArrowRight />
        </Link>
      </section>
    </main>
  )
}
export default Exito
