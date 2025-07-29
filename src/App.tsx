import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "./layouts/dashboard/DashboardLayout";
import { Resumen } from "./views/dashboard/Resumen";
import { Login } from './views/Login';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ui/theme-provider';

const queryClient = new QueryClient()

export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
     
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <div className="w-full h-screen">
            <Toaster richColors  />
            <BrowserRouter>
              <Routes>
                
                <Route path="/login" element={<Login/>} />


                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Resumen/>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
    </QueryClientProvider>
  )
}
