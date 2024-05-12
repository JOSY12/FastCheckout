import { create } from 'zustand'

export const Carrito = create(set => ({
  carrito: [],
  agregar: producto => {
    set(state => {
      const productoNoExiste = !state.carrito.some(p => p.id === producto.id)

      if (productoNoExiste) {
        // Si el producto no existe en el carrito, agrégalo
        return {
          carrito: [...state.carrito, producto]
        }
      }

      // Si el producto ya existe en el carrito, no hagas nada
      return state
    })
  },
  aumentar: id => {
    set(state => {
      const producto = state.carrito.find(producto => producto.id === id)
      if (producto) {
        return {
          carrito: state.carrito.map(producto => {
            if (producto.id === id) {
              return {
                ...producto,
                cantidad: producto.cantidad + 1
              }
            }
            return producto
          })
        }
      }
    })
  },
  restar: id => {
    set(state => {
      const producto = state.carrito.find(producto => producto.id === id)
      if (producto) {
        return {
          carrito: state.carrito.map(producto => {
            if (producto.id === id && producto.cantidad > 1) {
              return {
                ...producto,
                cantidad: producto.cantidad - 1
              }
            }

            return producto
          })
        }
      }
    })
  },

  quitar: id =>
    set(state => ({
      ...state,
      carrito: state.carrito.filter(producto => producto.id !== id)
    }))
}))
