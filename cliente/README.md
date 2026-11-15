# Fastcheckout

Frontend React + Vite con estilo neobrutalista, tema noche/día persistente y diseño adaptable a móvil. Mantiene el catálogo original, las categorías, marcas, búsqueda, diez productos por página, carrito persistente y rutas de retorno del pago.

## Desarrollo local

```powershell
cd C:\Users\Josmer\fastcheckout\cliente
npm ci
Copy-Item .env.example .env.local
npm run dev
```

El servidor usa `http://localhost:5173`. `strictPort` evita cambiar de puerto silenciosamente, porque el backend debe permitir el origen del frontend. Si 5173 está ocupado, puedes revisar el diseño con `npm run dev -- --port 5174`; para probar el pago, el backend debe permitir ese origen o debes liberar 5173 y reiniciar allí.

`VITE_SERVIDOR` debe contener solo el origen del backend, por ejemplo `http://localhost:3000`, sin `/fastcheckout` ni barra final. Reinicia Vite después de cambiar esta variable. Para producción, configura la URL pública de tu backend antes de compilar.

## Contrato del backend

La compra conserva `POST {VITE_SERVIDOR}/fastcheckout/compras/stripe`, `Content-Type: application/json`, `credentials: include` y el cuerpo `{ compras: [...] }`, con los mismos campos de producto y cantidades. El servidor debe devolver como JSON la URL del checkout. Las rutas siguen siendo `/`, `/exito` y `/fallo`. Este proyecto no modifica el backend.

## Comprobaciones

```powershell
npm run check
```

Ejecuta ESLint, pruebas y compilación. Las pruebas verifican filtros combinados, límites del paginado, carrito, persistencia, temas, contrato HTTP, errores y bloqueo de envíos simultáneos. El checkout se simula: no se crean sesiones ni se realizan pagos reales. Estas comprobaciones no sustituyen una revisión visual en navegador.

Las fotografías del catálogo y las fuentes de Google necesitan conexión. Las tarjetas muestran un sustituto si una fotografía no carga.
