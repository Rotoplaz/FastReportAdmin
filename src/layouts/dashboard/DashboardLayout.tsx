import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { NotifyReportProvider } from '@/components/providers/NotifyReportProvider'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/auth/useAuthStore'

import React from 'react'
import { Navigate, Outlet } from 'react-router'

export const DashboardLayout = () => {
    const { isAuthenticated, user } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

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
                    <h1 className="font-semibold">
                        Departamento:{" "}
                        {user?.role === "admin"
                            ? "General"
                            : user?.department.name ?? "Sin asignar"}
                    </h1>
                </header>
                <NotifyReportProvider>
                    <div className="py-2 px-6 over">
                        <Outlet />
                    </div>
                </NotifyReportProvider>

            </SidebarInset>
        </SidebarProvider>
    )
}
