import {
  LuSearch,
  LuSlidersHorizontal,
  LuRotateCcw,
  LuArrowUpRight
} from 'react-icons/lu'
import { Productos } from '../context/Productos'
const etiquetas = {
  sneakers: 'Sneakers',
  flats: 'Zapatos planos',
  sandals: 'Sandalias',
  heels: 'Tacones'
}
const Filtros = ({ onReset }) => {
  const { todascategorias, todascompanias, setFiltros, filtros } = Productos()
  const activos = Object.values(filtros).some(Boolean)
  return (
    <aside className="filters" aria-label="Filtros de productos">
      <div className="filter-heading">
        <h3>
          <LuSlidersHorizontal /> FILTRAR
        </h3>
        <span>01—03</span>
      </div>
      <div className="filter-group">
        <label className="filter-label" htmlFor="buscar">
          01 / BUSCAR
        </label>
        <div className="search-field">
          <LuSearch />
          <input
            id="buscar"
            name="nombre"
            type="search"
            placeholder="Tu próximo par…"
            value={filtros.nombre}
            onChange={(e) => setFiltros('nombre', e.target.value)}
          />
        </div>
      </div>
      <fieldset className="filter-group">
        <legend className="filter-label">02 / CATEGORÍA</legend>
        <div className="category-options">
          {['', ...todascategorias].map((categoria) => (
            <label
              className={
                'category-option ' +
                (filtros.categoria === categoria ? 'selected' : '')
              }
              key={categoria}
            >
              <input
                type="radio"
                name="categoria"
                value={categoria}
                checked={filtros.categoria === categoria}
                onChange={(e) => setFiltros('categoria', e.target.value)}
              />
              <span>
                {etiquetas[categoria] || categoria || 'Todos los pares'}
              </span>
              <LuArrowUpRight />
            </label>
          ))}
        </div>
      </fieldset>
      <div className="filter-group">
        <label className="filter-label" htmlFor="marca">
          03 / MARCA
        </label>
        <select
          id="marca"
          name="compañia"
          value={filtros.compañia}
          onChange={(e) => setFiltros('compañia', e.target.value)}
        >
          <option value="">Todas las marcas</option>
          {todascompanias.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
      </div>
      <button className="reset-filters" disabled={!activos} onClick={onReset}>
        <LuRotateCcw /> Limpiar filtros
      </button>
      <div className="filter-note">
        <span>✳</span>
        <p>
          EL BUEN ESTILO
          <br />
          EMPIEZA POR
          <br />
          <strong>TUS PIES.</strong>
        </p>
      </div>
    </aside>
  )
}
export default Filtros
