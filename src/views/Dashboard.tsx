import { AppSidebar } from '@/components/AppSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { MdAttachMoney } from 'react-icons/md'
import { FaRegCreditCard } from "react-icons/fa";
import { GoPulse } from "react-icons/go";
import { PiUsersThreeBold } from "react-icons/pi";
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
                <CardTitle className="text-sm font-medium">
                  Ingresos Totales
                </CardTitle>

                <MdAttachMoney />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% respecto al mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
                <PiUsersThreeBold />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% respecto al mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <FaRegCreditCard />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% respecto al mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activos Ahora</CardTitle>
                <GoPulse />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 en la última hora
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 grid-cols-1 mt-5">
            <Card className="lg:col-span-4 md:col-span-2 col-span-1">
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 md:col-span-2 col-span-1">
              <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Realizaste 265 ventas este mes.</CardDescription>
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
