import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "./layouts/dashboard/DashboardLayout";
import { Resumen } from "./views/dashboard/Resumen";
import { Login } from './views/Login';
import { Toaster } from 'sonner';

const queryClient = new QueryClient()

export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
