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
import { getReports } from "@/reports/actions/get-reports.action";


export const Resumen = () => {

    const { data: metricsData, isLoading: isLoadingMetrics } = useQuery({
        queryKey: ['metricsReports'],
        queryFn: async () => await getMetrics()
    })

    const { data: reportsData, isLoading: isLoadingReports } = useQuery({
        queryKey: ['get','reports'],
        queryFn: async () => await getReports()
    })


    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
                <MetricCard
                    icon={<MdReport />}
                    title="Reportes Totales"
                    value={metricsData?.totalReports || 0}
                    description="+20% respecto al mes pasado"
                    variant="info"
                    size="lg"
                    isLoading={isLoadingMetrics}
                />
    
                <MetricCard
                    icon={<MdReport />}
                    title="Reportes En Progreso"
                    value={metricsData?.reportsInProgress || 0}
                    description="reportes en tiempo real"
                    variant="default"
                    size="lg"
                    isLoading={isLoadingMetrics}
                />
    
                <MetricCard
                    icon={<FaCheckCircle />}
                    title="Reportes Resueltos"
                    value={metricsData?.reportsCompleted || 0}
                    description="75% tasa de resolución"
                    variant="success"
                    size="lg"
                    isLoading={isLoadingMetrics}
                />

                <MetricCard
                    icon={ <BiTime />}
                    title="Reportes Pendientes"
                    value={metricsData?.reportsPending || 0}
                    description="20% del total"
                    variant="warning"
                    size="lg"
                    isLoading={isLoadingMetrics}
                />

                <MetricCard
                    icon={<MdWarning />}
                    title="Reportes Urgentes"
                    value={metricsData?.reportsPriorityHigh || 0}
                    description="5% del total de reportes"
                    variant="destructive"
                    size="lg"
                    isLoading={isLoadingMetrics}
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
                    <CardContent className="px-2">
                        {
                            reportsData ? <RecentReports reports={reportsData} /> : null
                        }
                        
                    </CardContent>
                </Card>
            </div>


        </>
    )
}
