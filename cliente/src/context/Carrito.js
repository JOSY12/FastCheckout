import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const Carrito = create(
  persist(
    (set) => ({
      carrito: [],
      agregar: (producto) => {
        set(({ carrito }) => ({
          carrito: carrito.some((p) => p.id === producto.id)
            ? carrito
            : [...carrito, producto]
        }))
      },

      aumentar: (id) => {
        set(({ carrito }) => ({
          carrito: carrito.map((producto) =>
            producto.id === id
              ? { ...producto, cantidad: producto.cantidad + 1 }
              : producto
          )
        }))
      },
      restar: (id) => {
        set(({ carrito }) => ({
          carrito: carrito.map((producto) =>
            producto.id === id && producto.cantidad > 1
              ? { ...producto, cantidad: producto.cantidad - 1 }
              : producto
          )
        }))
      },

      quitar: (id) =>
        set(({ carrito }) => ({
          carrito: carrito.filter((producto) => producto.id !== id)
        }))
    }),
    {
      name: 'carrito'
    }
  )
)
