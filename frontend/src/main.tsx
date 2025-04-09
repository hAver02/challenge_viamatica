import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import { LoginPage2 } from './page/loginPage2.tsx'
import DashboardPage from './page/DashboardPage.tsx'
import { IsAuth, IsThereToken } from './page/validation/authPage.tsx'
import { RegisterPage2 } from './page/RegisterPage2.tsx'
import HomePage2 from './page/HomePage2.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <Toaster />
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>

          <Route element={<IsThereToken />}>
            <Route path='/login' element={<LoginPage2 />} />
            <Route path='/register' element={<RegisterPage2 />} />
          </Route>

          <Route element={<IsAuth />}>

              <Route path='/' element={<HomePage2 />} />
              <Route path='/dashboard' element={<DashboardPage />}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
