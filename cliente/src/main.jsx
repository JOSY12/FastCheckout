import React from 'react'
import ReactDOM from 'react-dom/client'
import { Rutas } from './Rutas/Rutas.jsx'
import './index.css'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Rutas} />
  </React.StrictMode>
)
