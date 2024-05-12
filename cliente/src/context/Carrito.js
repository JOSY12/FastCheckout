import { create } from 'zustand'

export const Carrito = create(set => ({
  carrito: [],
  agregar: producto => {
    set(({ carrito }) => ({
      carrito: carrito.some(p => p.id === producto.id)
        ? carrito
        : [...carrito, producto]
    }))
  },

  aumentar: id => {
    set(({ carrito }) => ({
      carrito: carrito.map(producto =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    }))
  },
  restar: id => {
    set(({ carrito }) => ({
      carrito: carrito.map(producto =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    }))
  },

  // restar: id => {
  //   set(({ carrito }) => ({
  //     carrito: carrito.map(producto =>
  //       producto.id === id && producto.cantidad > 1
  //         ? { ...producto, cantidad: producto.cantidad - 1 }
  //         : carrito.filter(producto => producto.id !== id)
  //     )
  //   }))
  // },
  quitar: id =>
    set(({ carrito }) => ({
      carrito: carrito.filter(producto => producto.id !== id)
    }))
}))
