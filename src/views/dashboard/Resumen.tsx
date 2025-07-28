import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdReport, MdWarning } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { RecentReports } from "@/components/reports/RecentReports";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { getReports } from "@/reports/actions/get-reports.action";
import { filterOverViewData } from "@/reports/utils/filter-overview-data";
import { socket } from "@/socket-io/socket";

import { GetReportsRequest, OverViewMode, Report } from "@/reports/interfaces/reports.interfaces";
import { toast } from "sonner"
interface Metrics {
    totalReports: number;
    reportsInProgress: number;
    reportsPending: number;
    reportsCompleted: number;
    reportsPriorityHigh: number;
}

export const Resumen = () => {
    const today = new Date();
    const year = today.getFullYear();

    const [overViewMode, setOverViewMode] = useState<OverViewMode>(OverViewMode.year_to_date);
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [metrics, setMetrics] = useState<Metrics>({
        totalReports: 0,
        reportsInProgress: 0,
        reportsPending: 0,
        reportsCompleted: 0,
        reportsPriorityHigh: 0,
    });

    const { data: reportsDataOverView } = useQuery({
        queryKey: ['get', 'reports', 'overview'],
        queryFn: () => getReports({ year }),
    });


    useEffect(() => {
        socket.emit('getInitialReports');

        const handleInitialReports = (data: GetReportsRequest) => {
            setRecentReports(data.data);
        };

        socket.on('initialReports', handleInitialReports);

        return () => {
            socket.off('initialReports', handleInitialReports);
        };
    }, []);

    useEffect(() => {
        socket.emit('getInitiaMetrics');

        const handleInitialMetrics = (data: Metrics) => {
            setMetrics(data);
        };

        socket.on('initialMetrics', handleInitialMetrics);

        return () => {
            socket.off('initialMetrics', handleInitialMetrics);
        };
    }, []);
    useEffect(() => {
        const handleMetrics = (incomingMetrics: Metrics) => setMetrics(incomingMetrics);
        socket.on('metrics', handleMetrics);
        return () => {
            socket.off('metrics', handleMetrics);
        }
    }, []);


    useEffect(() => {

        const handleNewReport = (newReport: Report) => {
            setRecentReports(prev => [newReport, ...prev]);
            toast.info(newReport.title, {
                description: newReport.description,
            })
        };

        socket.on('newReport', handleNewReport);
        return () => {
            socket.off('newReport', handleNewReport);

        }

    }, []);

    return (
        <>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                <MetricCard
                    icon={<MdReport />}
                    title="Reportes Totales"
                    value={metrics.totalReports}
                    description="+20% respecto al mes pasado"
                    variant="default"
                    size="lg"
                />
                <MetricCard
                    icon={<MdReport />}
                    title="Reportes En Progreso"
                    value={metrics.reportsInProgress}
                    description="reportes en tiempo real"
                    variant="info"
                    size="lg"
                />
                <MetricCard
                    icon={<FaCheckCircle />}
                    title="Reportes Resueltos"
                    value={metrics.reportsCompleted}
                    description="75% tasa de resolución"
                    variant="success"
                    size="lg"
                />
                <MetricCard
                    icon={<BiTime />}
                    title="Reportes Pendientes"
                    value={metrics.reportsPending}
                    description="20% del total"
                    variant="warning"
                    size="lg"
                />
                <MetricCard
                    icon={<MdWarning />}
                    title="Reportes Urgentes"
                    value={metrics.reportsPriorityHigh}
                    description="5% del total de reportes"
                    variant="destructive"
                    size="lg"
                />
            </div>

            <div className="grid gap-4 mt-5 md:grid-cols-2 lg:grid-cols-10 grid-cols-1">

                <Card className="lg:col-span-6 md:col-span-2 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-gray-700">Tendencia de Reportes</CardTitle>
                        <CardDescription className="text-gray-600">Análisis de los últimos 30 días</CardDescription>
                        <Select value={overViewMode} onValueChange={(e) => setOverViewMode(e as OverViewMode)}>
                            <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Seleccionar periodo">
                                <SelectValue placeholder="Últimos 3 meses" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value={OverViewMode.year_to_date}>Este año</SelectItem>
                                <SelectItem value={OverViewMode.last_3_months}>Últimos 3 meses</SelectItem>
                                <SelectItem value={OverViewMode.last_30_days}>Últimos 30 días</SelectItem>
                                <SelectItem value={OverViewMode.last_7_days}>Últimos 7 días</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart data={filterOverViewData(reportsDataOverView || [], overViewMode)} />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-4 md:col-span-2 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-gray-700">Reportes Recientes</CardTitle>
                        <CardDescription className="text-gray-600">
                            Se han recibido {recentReports?.length} reportes hoy
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                        <RecentReports reports={recentReports} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
