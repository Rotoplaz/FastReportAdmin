import { AppSidebar } from '@/components/AppSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { MdReport } from 'react-icons/md'
import { FaCheckCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { MdWarning } from "react-icons/md";
import { OverviewChart } from '@/components/OverviewChart'
import { RecentReports } from '@/components/RecentReports'

export const Dashboard = () => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "15rem",
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 mb-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="font-semibold">Admin</h1>
        </header>
        <div className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">
                  Reportes Totales
                </CardTitle>
                <MdReport className="text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">500</div>
                <p className="text-xs text-blue-500">
                  +20% respecto al mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Reportes Resueltos</CardTitle>
                <FaCheckCircle className="text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">375</div>
                <p className="text-xs text-green-500">
                  75% tasa de resolución
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-700">Pendientes</CardTitle>
                <BiTime className="text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">100</div>
                <p className="text-xs text-amber-500">
                  20% del total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-700">Urgentes</CardTitle>
                <MdWarning className="text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">25</div>
                <p className="text-xs text-red-500">
                  5% del total de reportes
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 grid-cols-1 mt-5">
            <Card className="lg:col-span-4 md:col-span-2 col-span-1">
              <CardHeader>
                <CardTitle className="text-gray-700">Tendencia de Reportes</CardTitle>
                <CardDescription className="text-gray-600">Análisis de los últimos 30 días</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 md:col-span-2 col-span-1">
              <CardHeader>
                <CardTitle className="text-gray-700">Reportes Recientes</CardTitle>
                <CardDescription className="text-gray-600">Se han recibido 15 reportes hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentReports />
              </CardContent>
            </Card>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
