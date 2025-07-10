import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import React from 'react'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {

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
                <div className="p-2">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
