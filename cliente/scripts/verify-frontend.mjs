import assert from 'node:assert/strict'
import { test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { filtrarProductos, paginarProductos } from '../src/utils/catalogo.js'

const storage = new Map()
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key)
}
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom'
})
try {
  const { Carrito } = await server.ssrLoadModule('/src/context/Carrito.js')
  const { Productos } = await server.ssrLoadModule('/src/context/Productos.js')
  const { default: MainContainer } = await server.ssrLoadModule(
    '/src/components/MainContainer.jsx'
  )
  const { default: Pagination } = await server.ssrLoadModule(
    '/src/components/Pagination.jsx'
  )
  const render = (Component, props = {}) =>
    renderToStaticMarkup(React.createElement(Component, props))
  const catalogo = Productos.getState().productos
  const producto = { ...catalogo[0], cantidad: 1 }
  const originalFetch = globalThis.fetch

  await test('Fastcheckout conserva el catálogo y el contrato del checkout', async (t) => {
    await t.test(
      'carrito: no duplica productos, respeta el mínimo y calcula cantidades',
      () => {
        Carrito.getState().vaciarcarro()
        Carrito.getState().agregar(producto)
        Carrito.getState().agregar(producto)
        assert.equal(Carrito.getState().carrito.length, 1)
        Carrito.getState().restar(producto.id)
        assert.equal(Carrito.getState().carrito[0].cantidad, 1)
        Carrito.getState().aumentar(producto.id)
        assert.equal(Carrito.getState().carrito[0].cantidad, 2)
        Carrito.getState().quitar(producto.id)
        assert.equal(Carrito.getState().carrito.length, 0)
      }
    )
    await t.test(
      'catálogo: diez productos por página y filtros combinados sin alterar los datos',
      () => {
        assert.equal(
          (render(MainContainer).match(/class="product-card/g) || []).length,
          10
        )
        Productos.getState().setFiltros('nombre', producto.nombre)
        Productos.getState().setFiltros('compañia', producto.compañia)
        Productos.getState().setFiltros('categoria', producto.categoria)
        const resultados = filtrarProductos(
          catalogo,
          Productos.getState().filtros
        )
        assert.equal(resultados.length, 1)
        assert.equal(resultados[0].id, producto.id)
        const paginado = paginarProductos(resultados, 3, 10)
        assert.equal(paginado.pagina, 1)
        assert.equal(paginado.visibles.length, 1)
        Productos.getState().setFiltros('nombre', 'no-existe-este-producto')
        assert.equal(
          filtrarProductos(catalogo, Productos.getState().filtros).length,
          0
        )
        for (const key of ['nombre', 'compañia', 'categoria'])
          Productos.getState().setFiltros(key, '')
        assert.deepEqual(Productos.getState().productos[0], catalogo[0])
      }
    )
    await t.test(
      'paginación: límites accesibles y cero páginas cuando no hay resultados',
      () => {
        const props = {
          productosporpagina: 10,
          productostotales: catalogo.length,
          paginaActiva: 1,
          setpaginaActiva() {}
        }
        const html = render(Pagination, props)
        assert.match(html, /aria-label="Página anterior" disabled/)
        assert.match(html, /aria-current="page"/)
        assert.equal(render(Pagination, { ...props, productostotales: 0 }), '')
      }
    )
    await t.test(
      'checkout: mismo POST, endpoint, credenciales y objeto compras; impide envíos repetidos',
      async () => {
        Carrito.getState().vaciarcarro()
        Carrito.getState().agregar(producto)
        let calls = 0
        let finish
        globalThis.window = { location: { href: '' } }
        globalThis.fetch = async (url, options) => {
          calls++
          assert.equal(url, 'http://localhost:3000/fastcheckout/compras/stripe')
          assert.equal(options.method, 'POST')
          assert.equal(options.credentials, 'include')
          assert.deepEqual(options.headers, {
            'Content-Type': 'application/json'
          })
          assert.deepEqual(JSON.parse(options.body), { compras: [producto] })
          await new Promise((resolve) => {
            finish = resolve
          })
          return {
            ok: true,
            json: async () => 'https://checkout.stripe.com/test-session'
          }
        }
        const first = Carrito.getState().comprartodo()
        await Carrito.getState().comprartodo()
        assert.equal(calls, 1)
        assert.equal(Carrito.getState().procesando, true)
        finish()
        await first
        assert.equal(
          window.location.href,
          'https://checkout.stripe.com/test-session'
        )
        assert.equal(Carrito.getState().procesando, false)
        assert.deepEqual(JSON.parse(storage.get('carrito')).state, {
          carrito: [producto]
        })
      }
    )
    await t.test(
      'checkout: errores HTTP, JSON inválido y red conservan el carrito y permiten reintentar',
      async () => {
        for (const response of [
          async () => ({ ok: false, status: 500 }),
          async () => ({ ok: true, json: async () => ({ error: 'sin URL' }) }),
          async () => ({
            ok: true,
            json: async () => {
              throw new SyntaxError('JSON inválido')
            }
          }),
          async () => {
            throw new TypeError('Failed to fetch')
          }
        ]) {
          window.location.href = ''
          globalThis.fetch = response
          await Carrito.getState().comprartodo()
          assert.equal(window.location.href, '')
          assert.equal(Carrito.getState().procesando, false)
          assert.deepEqual(Carrito.getState().carrito, [producto])
        }
      }
    )
    await t.test('carrito vacío: no hace peticiones', async () => {
      Carrito.getState().vaciarcarro()
      globalThis.fetch = () => {
        assert.fail('No debe enviar un carrito vacío')
      }
      await Carrito.getState().comprartodo()
    })
    await t.test(
      'tema: alterna noche/día y persiste la preferencia',
      async () => {
        globalThis.document = {
          documentElement: { dataset: { theme: 'dark' } }
        }
        const { Tema } = await server.ssrLoadModule('/src/context/Tema.js')
        Tema.getState().cambiarTema()
        assert.equal(document.documentElement.dataset.theme, 'light')
        assert.equal(storage.get('fastcheckout-theme'), 'light')
        Tema.getState().cambiarTema()
        assert.equal(document.documentElement.dataset.theme, 'dark')
      }
    )
  })
  globalThis.fetch = originalFetch
} finally {
  await server.close()
}
