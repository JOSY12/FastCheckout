import { Link, useRouteError } from 'react-router-dom'
import { LuArrowRight } from 'react-icons/lu'
const ErrorPagina = () => {
  const error = useRouteError()
  return (
    <main id="contenido" className="result-page page-width">
      <section className="result-card">
        <span className="eyebrow">
          FASTCHECKOUT / {error?.status || 'ERROR'}
        </span>
        <h1>
          FUERA
          <br />
          <span className="accent-text">DE RUTA.</span>
        </h1>
        <p>
          {error?.status === 404
            ? 'Ese camino no existe. Tu próximo par está en el catálogo.'
            : 'No pudimos cargar esta página. Vuelve al catálogo e inténtalo de nuevo.'}
        </p>
        <Link to="/" className="button button-accent">
          Volver al catálogo <LuArrowRight />
        </Link>
      </section>
    </main>
  )
}
export default ErrorPagina
