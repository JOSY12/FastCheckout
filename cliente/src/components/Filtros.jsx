// import { useState, useEffect } from 'react'
import { Productos } from '../context/Productos'
import { useEffect } from 'react'
const Filtros = () => {
  const { todascategorias, todascompanias, setFiltros, filtros } = Productos()

  const selecionfiltros = (e) => {
    const { name, value } = e.target
    setFiltros(name, value)
  }

  useEffect(() => {}, [filtros])

  return (
    <div className='flex place-content-center'>
      <select
        onChange={selecionfiltros}
        name='categoria'
        className='m-2 rounded-lg border-2 border-black'
      >
        <option value={''}>Todos</option>
        {todascategorias?.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
      <select
        onChange={selecionfiltros}
        name='compañia'
        className='m-2 rounded-lg border-2 border-black'
      >
        <option value={''}>Todos</option>
        {todascompanias?.map((compañia) => (
          <option key={compañia} value={compañia}>
            {compañia}
          </option>
        ))}
      </select>
      <label className='m-2 rounded-lg border-2 border-black'>
        <input name='nombre' type='text' onChange={selecionfiltros} />
      </label>
    </div>
  )
}

export default Filtros
