import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LuX, LuArrowRight } from 'react-icons/lu'
const Fallo = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const paymentId = params.get('payment_id')
  const status = params.get('status')
  const paymentType = params.get('payment_type')
  useEffect(() => {
    if (!paymentId || !status || !paymentType) {
      navigate('/', { replace: true })
      return
    }
    window.history.replaceState(null, '', '/')
    const timeout = setTimeout(() => navigate('/', { replace: true }), 5000)
    return () => clearTimeout(timeout)
  }, [navigate, paymentId, status, paymentType])
  return paymentId && status && paymentType ? (
    <main id="contenido" className="result-page page-width">
      <section className="result-card">
        <span className="result-icon result-error">
          <LuX />
        </span>
        <span className="eyebrow">CHECKOUT / CANCELADO</span>
        <h1>
          OTRO
          <br />
          <span className="accent-text">INTENTO.</span>
        </h1>
        <p>
          El pago no se completó. Tus productos siguen en el carrito para que
          puedas intentarlo de nuevo.
        </p>
        <p className="redirect-note">
          <span className="spinner" /> Volviendo al catálogo en unos segundos…
        </p>
        <Link to="/" className="button button-accent">
          Volver al catálogo <LuArrowRight />
        </Link>
      </section>
    </main>
  ) : null
}
export default Fallo
