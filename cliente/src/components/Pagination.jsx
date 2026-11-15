import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
const Pagination = ({
  productosporpagina,
  productostotales,
  setpaginaActiva,
  paginaActiva
}) => {
  const total = Math.ceil(productostotales / productosporpagina)
  if (!total) return null
  return (
    <nav className="pagination" aria-label="Paginación del catálogo">
      <span className="pagination-label">
        PÁGINA {String(paginaActiva).padStart(2, '0')} /{' '}
        {String(total).padStart(2, '0')}
      </span>
      <div className="pagination-buttons">
        <button
          className="icon-button"
          aria-label="Página anterior"
          disabled={paginaActiva <= 1}
          onClick={() => setpaginaActiva(paginaActiva - 1)}
        >
          <LuArrowLeft />
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            className={
              'icon-button ' + (paginaActiva === pagina ? 'current-page' : '')
            }
            aria-label={'Página ' + pagina}
            aria-current={paginaActiva === pagina ? 'page' : undefined}
            onClick={() => setpaginaActiva(pagina)}
          >
            {pagina}
          </button>
        ))}
        <button
          className="icon-button"
          aria-label="Página siguiente"
          disabled={paginaActiva >= total}
          onClick={() => setpaginaActiva(paginaActiva + 1)}
        >
          <LuArrowRight />
        </button>
      </div>
    </nav>
  )
}
export default Pagination
