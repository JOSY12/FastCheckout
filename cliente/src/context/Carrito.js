import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const SERVIDOR = import.meta.env.VITE_SERVIDOR
import { toast } from 'sonner'
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

        toast.promise(
          fetch(`${SERVIDOR}/fastcheckout/compras/stripe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ compras })
          }),
          {
            loading: 'Procesando compra...',
            success: (data) => {
              toast.success('Compra creada con éxito redirigiendo...')
              data.json().then((res) => {
                // console.log(res)
                window.location.href = res
              })
            },
            error: 'Error al crear compra'
          }
        )

        // await fetch(`${SERVIDOR}/fastcheckout/compras/crear`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ compras })
        // })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     console.log(res)
        //   })
      }

      // termina el persist
    }),
    {
      name: 'carrito'
    }
  )
)
