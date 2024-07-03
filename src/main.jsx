import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/Inscription.jsx'
import { Toaster } from 'react-hot-toast'
import RouteProtector from './components/RouteProtector.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteProtector><Dashboard/></RouteProtector>
  },
  {
    path: "/connexion",
    element: <Connexion/>
  },
  {
    path: "/inscription",
    element: <Inscription/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
