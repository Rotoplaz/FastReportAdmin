import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { DashboardLayout } from "./layouts/dashboard/DashboardLayout";
import { Resumen } from "./views/dashboard/Resumen";
import { Login } from './views/Login';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ui/theme-provider';
import { Reports } from './views/dashboard/Reports';
import { Workers } from './views/dashboard/Workers';
import { Departments } from './views/dashboard/Departments';
import { useAuthStore } from './store/auth/useAuthStore';

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
