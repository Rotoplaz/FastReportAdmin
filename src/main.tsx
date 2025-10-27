import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { App } from './App'

// TODO (Data): Cachear la información de todos los módulos con TanStack Query.
// TODO (Sockets): Actualizar los datos al recibir un evento.
// TODO (Assignments): Manejar las asignaciones correctamente.
// TODO (UX): Mejorar la experiencia de usuario.
// TODO (Auth): Eliminar el JWT del localStorage cuando expire.


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
