import { MdReport } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";


import { RecentReports } from "@/reports/components/RecentReports";
import { filterOverViewData } from "@/reports/utils/filter-overview-data";
import { OverViewMode } from "@/reports/interfaces/reports.interfaces";

import { useReports } from "@/reports/hooks/useReports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, MetricCard, OverviewChart, PieChartCard, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components";
import { transformReportData } from "@/shared/lib";

export const Resumen = () => {

    const { metrics, overViewMode, recentReports, setOverViewMode, annualReports } = useReports();

    return (
        <>
            <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">

                <MetricCard
                    icon={<MdReport />}
                    title="Reportes Totales"
                    value={metrics.totalReports}
                    description="+20% respecto al mes pasado"
                    variant="default"
                    size="lg"
                    className="max-h-min w-full mr-4"
                />

                <MetricCard
                    icon={<MdReport />}
                    title="Reportes En Progreso"
                    value={metrics.reportsInProgress}
                    description="reportes en tiempo real"
                    variant="info"
                    size="lg"
                    className="max-h-min"
                />
                <MetricCard
                    icon={<FaCheckCircle />}
                    title="Reportes Resueltos"
                    value={metrics.reportsCompleted}
                    description="75% tasa de resolución"
                    variant="success"
                    size="lg"
                    className="max-h-min"
                />
                <MetricCard
                    icon={<BiTime />}
                    title="Reportes Pendientes"
                    value={metrics.reportsPending}
                    description="20% del total"
                    variant="warning"
                    size="lg"
                    className="max-h-min"
                />


            </div>

            <Tabs defaultValue="charts" className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="charts">Gráficas</TabsTrigger>
                    <TabsTrigger value="reports">Reportes recientes</TabsTrigger>
                </TabsList>

                <TabsContent value="charts">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10 grid-cols-1">

                        <Card className="lg:col-span-6 md:col-span-2 col-span-1 max-h-min">
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
                                <OverviewChart data={filterOverViewData(annualReports || [], overViewMode)} />
                            </CardContent>
                        </Card>
                        <div className="lg:col-span-4 md:col-span-2 col-span-1">
                            <PieChartCard

                                title="Reportes por Prioridad"
                                description="Último año"
                                data={transformReportData({ ...metrics })}
                                footerInfo={{
                                    trendText: "↑ 8.3% este mes",
                                    extraText: "Comparado con el mes anterior",
                                }}

                            />
                        </div>

                    </div>
                </TabsContent>
                <TabsContent value="reports">

                    <Card className="lg:col-span-4 md:col-span-2 col-span-1  m-auto ">
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
                </TabsContent>
            </Tabs>




        </>
    );
};
