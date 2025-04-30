
import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "./layouts/dashboard/DashboardLayout";
import { Resumen } from "./views/dashboard/Resumen";

function App() {

  return (
    <div className="w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Resumen/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
