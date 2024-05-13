/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import data from '../assets/data.js'
export const Productos = create((set) => ({
  productos: data,
  filtros: { compañia: '', categoria: '', nombre: '' },

  todascategorias: data.reduce((categorias, item) => {
    if (!categorias.includes(item.categoria)) {
      categorias.push(item.categoria)
    }
    return categorias
  }, []),
  todascompanias: data.reduce((compañias, item) => {
    if (!compañias.includes(item.compañia)) {
      compañias.push(item.compañia)
    }
    return compañias
  }, []),

  setFiltros: (name, value) =>
    set(({ filtros }) => ({ filtros: { ...filtros, [name]: value } }))
}))
