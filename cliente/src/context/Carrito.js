import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const SERVIDOR = import.meta.env.VITE_SERVIDOR
export const Carrito = create(
  persist(
    (set, get) => ({
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
        })),

      vaciarcarro: () => set(() => ({ carrito: [] })),

      comprartodo: async () => {
        const compras = get().carrito
        await fetch(`${SERVIDOR}/fastcheckout/compras/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ compras })
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)

            if (res) {
              window.location.href = res
            }
          })
      }

      // termina el persist
    }),
    {
      name: 'carrito'
    }
  )
)
