const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
export const precioFormateado = (value) => currency.format(value)
