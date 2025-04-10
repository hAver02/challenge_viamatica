
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import { LoginPage2 } from './page/loginPage2.tsx'
import DashboardPage from './page/DashboardPage.tsx'
import { RegisterPage2 } from './page/RegisterPage2.tsx'
import HomePage2 from './page/HomePage2.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { StrictMode } from 'react'
import UserDashboard from './page/UserDashboard.tsx'
import AdminDashboard from './page/AdminDashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Toaster />
      {/* <RouterProvider router={router} /> */}
          <Routes>
            <Route path="/login" element={<LoginPage2 />} />
            <Route path="/register" element={<RegisterPage2 />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
              />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
              />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
    </AuthProvider>
        </BrowserRouter>
              </StrictMode>

)
