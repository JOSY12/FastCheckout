import { useEffect, useState } from 'react'
import { LuArrowDown, LuArrowUpRight, LuSearchX } from 'react-icons/lu'
import Product from './Product'
import { Productos } from '../context/Productos.js'
import Pagination from './Pagination'
import Filtros from './Filtros.jsx'
import { filtrarProductos, paginarProductos } from '../utils/catalogo'
const POR_PAGINA = 10
const MainContainer = () => {
  const { productos, filtros, setFiltros } = Productos()
  const [paginaActiva, setpaginaActiva] = useState(1)
  const filtrados = filtrarProductos(productos, filtros)
  useEffect(() => {
    setpaginaActiva(1)
  }, [filtros])
  const { pagina, inicio, visibles } = paginarProductos(
    filtrados,
    paginaActiva,
    POR_PAGINA
  )
  const limpiar = () => {
    for (const name of ['nombre', 'categoria', 'compañia']) setFiltros(name, '')
  }
  return (
    <main id="contenido">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="mini-square" /> EL ESTILO NO PIDE PERMISO
          </span>
          <h1 id="hero-title">
            TU PRÓXIMO
            <br />
            <span>PASO.</span>
            <span className="headline-star" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p>
            Encuentra tu par. Marca tu ritmo.
            <br />
            El resto es seguir adelante.
          </p>
          <a className="button button-accent hero-cta" href="#catalogo">
            Explorar colección <LuArrowDown />
          </a>
          <div className="hero-footnote">
            <span>01 / ELIGE</span>
            <span>02 / AÑADE</span>
            <span>
              03 / ESTRENA <LuArrowUpRight />
            </span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-topline">
            <span>FASTCHECKOUT®</span>
            <span>DA EL SALTO ↗</span>
          </div>
          <span className="art-word">MOVE</span>
          <img
            src={productos[1].img}
            alt=""
            className="hero-shoe"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="art-sticker">
            BUEN PAR.
            <br />
            BUENA VIBRA.
          </div>
          <div className="art-bottomline">
            <span>
              HECHO PARA
              <br />
              <strong>NO QUEDARTE QUIETO.</strong>
            </span>
            <LuArrowUpRight />
          </div>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <div>
          BUEN ESTILO <span>✳</span> CERO VUELTAS <span>✳</span> TU SIGUIENTE
          PAR <span>✳</span> FAST CHECKOUT <span>✳</span> BUEN ESTILO{' '}
          <span>✳</span> CERO VUELTAS <span>✳</span> TU SIGUIENTE PAR{' '}
          <span>✳</span>
        </div>
      </div>
      <section
        id="catalogo"
        className="catalog page-width"
        aria-labelledby="catalog-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              EL CATÁLOGO / {String(productos.length).padStart(2, '0')} PARES
              PARA ELEGIR
            </span>
            <h2 id="catalog-title">
              ENCUENTRA <span>TU PAR.</span>
            </h2>
          </div>
          <span className="collection-tag">
            LA COLECCIÓN <LuArrowDown />
          </span>
        </div>
        <div className="catalog-layout">
          <Filtros onReset={limpiar} />
          <div className="catalog-results">
            <div className="results-toolbar">
              <p aria-live="polite">
                <strong>{filtrados.length}</strong> productos
                {filtrados.length > 0 && (
                  <span className="muted">
                    {' '}
                    · Mostrando {inicio + 1}–
                    {Math.min(inicio + POR_PAGINA, filtrados.length)}
                  </span>
                )}
              </p>
              <span className="eyebrow">
                SELECCIÓN ORIGINAL <span className="status-dot" />
              </span>
            </div>
            {filtrados.length > 0 ? (
              <div className="product-grid">
                {visibles.map((producto) => (
                  <Product key={producto.id} {...producto} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <LuSearchX />
                <span className="eyebrow">SIN COINCIDENCIAS</span>
                <h3>Ese par se nos escapa.</h3>
                <p>Prueba otra búsqueda o cambia los filtros.</p>
                <button className="button button-accent" onClick={limpiar}>
                  Limpiar filtros <LuArrowUpRight />
                </button>
              </div>
            )}
            <Pagination
              productosporpagina={POR_PAGINA}
              productostotales={filtrados.length}
              setpaginaActiva={setpaginaActiva}
              paginaActiva={pagina}
            />
          </div>
        </div>
      </section>
      <section className="bottom-banner page-width">
        <h2>
          MENOS VUELTAS.
          <br />
          <span>MÁS CALLE.</span>
        </h2>
        <a href="#catalogo" className="button">
          Encuentra el tuyo <LuArrowUpRight />
        </a>
      </section>
    </main>
  )
}
export default MainContainer
