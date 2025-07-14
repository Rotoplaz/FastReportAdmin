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
import { useState } from "react";
import { OverViewMode } from "@/reports/interfaces/reports.interfaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterOverViewData } from "@/reports/utils/filter-overview-data";


export const Resumen = () => {

    const [overViewMode, setOverViewMode] = useState<OverViewMode>(OverViewMode.year_to_date);


    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const { data: metricsData, isLoading: isLoadingMetrics } = useQuery({
        queryKey: ['metricsReports'],
        queryFn: async () => await getMetrics()
    })

    const { data: reportsData, isLoading: isLoadingReports } = useQuery({
        queryKey: ['get', 'reports', "today"],
        queryFn: async () => await getReports({ year, month, day })
    })

    const { data: reportsDataOverView } = useQuery({
        queryKey: ['get', 'reports', 'overview'],
        queryFn: async () => await getReports({ year })
    })




    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
                <MetricCard
                    icon={<MdReport />}
                    title="Reportes Totales"
                    value={metricsData?.totalReports || 0}
                    description="+20% respecto al mes pasado"
                    variant="default"
                    size="lg"
                    isLoading={isLoadingMetrics}
                />

                <MetricCard
                    icon={<MdReport />}
                    title="Reportes En Progreso"
                    value={metricsData?.reportsInProgress || 0}
                    description="reportes en tiempo real"
                    variant="info"
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
                    icon={<BiTime />}
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
                        <Select value={overViewMode} onValueChange={(e) => setOverViewMode(e as OverViewMode)}>
                            <SelectTrigger
                                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value={OverViewMode.year_to_date} className="rounded-lg">
                                    Este año
                                </SelectItem>
                                <SelectItem value={OverViewMode.last_3_months} className="rounded-lg">
                                    Last 3 months
                                </SelectItem>
                                <SelectItem value={OverViewMode.last_30_days} className="rounded-lg">
                                    Last 30 days
                                </SelectItem>
                                <SelectItem value={OverViewMode.last_7_days} className="rounded-lg">
                                    Last 7 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart data={filterOverViewData(reportsDataOverView || [], overViewMode)} />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3 md:col-span-2 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-gray-700">Reportes Recientes</CardTitle>
                        <CardDescription className="text-gray-600">Se han recibido {reportsData?.length} reportes hoy</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">

                        <RecentReports reports={reportsData || []} isLoading={isLoadingReports} />

                    </CardContent>
                </Card>
            </div>


        </>
    )
}
