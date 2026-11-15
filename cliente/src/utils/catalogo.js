export const filtrarProductos = (productos, filtros) => {
  const busqueda = filtros.nombre.trim().toLowerCase()
  return productos.filter(
    (producto) =>
      (!filtros.compañia || producto.compañia === filtros.compañia) &&
      (!filtros.categoria || producto.categoria === filtros.categoria) &&
      producto.nombre.toLowerCase().includes(busqueda)
  )
}

export const paginarProductos = (productos, paginaActiva, porPagina) => {
  const pagina = Math.min(
    Math.max(1, paginaActiva),
    Math.max(1, Math.ceil(productos.length / porPagina))
  )
  const inicio = (pagina - 1) * porPagina
  return {
    pagina,
    inicio,
    visibles: productos.slice(inicio, inicio + porPagina)
  }
}
