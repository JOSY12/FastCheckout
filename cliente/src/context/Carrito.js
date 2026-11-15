import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
const SERVIDOR = import.meta.env.VITE_SERVIDOR
export const Carrito = create(
  persist(
    (set, get) => ({
      carrito: [],
      procesando: false,
      agregar: (producto) =>
        set(({ carrito }) => ({
          carrito: carrito.some((p) => p.id === producto.id)
            ? carrito
            : [...carrito, producto]
        })),
      aumentar: (id) =>
        set(({ carrito }) => ({
          carrito: carrito.map((producto) =>
            producto.id === id
              ? { ...producto, cantidad: producto.cantidad + 1 }
              : producto
          )
        })),
      restar: (id) =>
        set(({ carrito }) => ({
          carrito: carrito.map((producto) =>
            producto.id === id && producto.cantidad > 1
              ? { ...producto, cantidad: producto.cantidad - 1 }
              : producto
          )
        })),
      quitar: (id) =>
        set(({ carrito }) => ({
          carrito: carrito.filter((producto) => producto.id !== id)
        })),
      vaciarcarro: () => set({ carrito: [] }),
      comprartodo: async () => {
        if (get().procesando || !get().carrito.length) return
        if (!SERVIDOR) {
          toast.error('Falta configurar la dirección del servidor.')
          return
        }
        const compras = get().carrito
        set({ procesando: true })
        const toastId = toast.loading('Preparando tu checkout…')
        try {
          const respuesta = await fetch(
            `${SERVIDOR}/fastcheckout/compras/stripe`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ compras })
            }
          )
          if (!respuesta.ok)
            throw new Error('No se pudo crear el pago. Inténtalo de nuevo.')
          const url = await respuesta.json()
          if (typeof url !== 'string' || !/^https?:\/\//.test(url))
            throw new Error(
              'El servidor no devolvió una dirección de pago válida.'
            )
          toast.success('Checkout listo. Redirigiendo…', { id: toastId })
          window.location.href = url
        } catch (error) {
          toast.error(
            error instanceof TypeError
              ? 'No se pudo conectar con el servidor. Comprueba que esté disponible.'
              : error.message,
            { id: toastId }
          )
        } finally {
          set({ procesando: false })
        }
      }
    }),
    { name: 'carrito', partialize: (state) => ({ carrito: state.carrito }) }
  )
)
