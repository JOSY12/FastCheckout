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
    <div className='flex   place-content-center m-2  select-none  curosor-pointer     flex-wrap'>
      <label htmlFor='' className=' '>
        Categoria
        <select
          onChange={selecionfiltros}
          name='categoria'
          className='m-2   outline-none '
        >
          <option value={''}>Todos</option>
          {todascategorias?.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor=''>
        Marca
        <select
          onChange={selecionfiltros}
          name='compañia'
          className='m-2   outline-none '
        >
          <option value={''}>Todos</option>
          {todascompanias?.map((compañia) => (
            <option key={compañia} value={compañia}>
              {compañia}
            </option>
          ))}
        </select>
      </label>

      <div className=' m-2 p-0'>
        <input
          name='nombre'
          className='  border-gray-300 border-2 rounded-md w-[300px] outline-none  '
          placeholder='Buscar'
          type='text'
          onChange={selecionfiltros}
        />
      </div>
    </div>
  )
}

export default Filtros
