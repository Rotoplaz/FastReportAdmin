import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'sonner';

import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { useAuthStore } from './shared/store';
import { DashboardLayout, ThemeProvider } from './shared/components';
import { Login } from './auth/views/Login';
import { Resumen } from './reports/views/Resumen';
import { Reports } from './reports/views/Reports';
import { Workers } from './workers/views/Workers';
import { Departments } from './departments/views/Departments';

const queryClient = new QueryClient()

export const App = () => {
  const { user } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
     
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <div className="w-full h-screen">
            <Toaster richColors  />
            <BrowserRouter>
              <Routes>
                
                <Route path="/login" element={<Login/>} />

                <Route path="/" element={<DashboardLayout />} >
                  <Route index element={<Resumen/>} />
                  <Route path="reportes" element={<Reports/>} />
                  <Route path="trabajadores" element={<Workers/>} />

                  {user?.role === "admin" && (
                    <Route path="departamentos" element={<Departments />} />
                  )}

                  <Route path="*" element={<Navigate to="/" />} />
                  

                </Route>


              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
    </QueryClientProvider>
  )
}
