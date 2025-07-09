import { OverviewChart } from "@/components/dashboard/OverviewChart"
import { RecentReports } from "@/components/reports/RecentReports"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MdReport } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { MdWarning } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "@/reports/actions/get-metrics.action";
import { MetricCard } from "@/components/dashboard/MetricCard";


export const Resumen = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['metricsReports'],
        queryFn: async () => await getMetrics()
    })

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                <MetricCard
                    icon={<MdReport />}
                    title="Reportes Totales"
                    value={data?.totalReports || 0}
                    description="+20% respecto al mes pasado"
                    variant="info"
                    size="lg"
                    isLoading={isLoading}
                />

                <MetricCard
                    icon={<FaCheckCircle />}
                    title="Reportes Resueltos"
                    value={data?.reportsCompleted || 0}
                    description="75% tasa de resolución"
                    variant="success"
                    size="lg"
                    isLoading={isLoading}
                />

                <MetricCard
                    icon={ <BiTime />}
                    title="Reportes Pendientes"
                    value={data?.reportsPending || 0}
                    description="20% del total"
                    variant="warning"
                    size="lg"
                    isLoading={isLoading}
                />

                <MetricCard
                    icon={<MdWarning />}
                    title="Reportes Pendientes"
                    value={data?.reportsPriorityHigh || 0}
                    description="5% del total de reportes"
                    variant="destructive"
                    size="lg"
                    isLoading={isLoading}
                />
    
                       

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


        </>
    )
}
