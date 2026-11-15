import { create } from 'zustand'
export const Tema = create((set) => ({
  tema: document.documentElement.dataset.theme || 'dark',
  cambiarTema: () =>
    set(({ tema }) => {
      const siguiente = tema === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = siguiente
      try {
        localStorage.setItem('fastcheckout-theme', siguiente)
      } catch {
        /* Storage may be unavailable. */
      }
      return { tema: siguiente }
    })
}))
