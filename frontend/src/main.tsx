import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <Toaster />
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
