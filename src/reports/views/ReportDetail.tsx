import { useQuery } from "@tanstack/react-query";
import { getReportDetail } from "../actions/get-report-detail.action";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Status, Priority } from "../interfaces/reports.interfaces";
import { useParams } from "react-router";

const statusColors: Record<Status, string> = {
    [Status.Pending]: "bg-yellow-500",
    [Status.InProgress]: "bg-blue-500",
    [Status.Completed]: "bg-green-500",
};

const priorityColors: Record<Priority, string> = {
    [Priority.Low]: "bg-(--color-low)",
    [Priority.Medium]: "bg-(--color-medium)",
    [Priority.High]: "bg-(--color-high)",
};

const statusTranslations: Record<Status, string> = {
    [Status.Pending]: "Pendiente",
    [Status.InProgress]: "En Progreso",
    [Status.Completed]: "Completado",
};

const priorityTranslations: Record<Priority, string> = {
    [Priority.Low]: "Baja",
    [Priority.Medium]: "Media",
    [Priority.High]: "Alta",
};

export const ReportDetail = () => {
    const params = useParams();

    const { data: report, isLoading, isError, error } = useQuery({
        queryKey: ["report", params.id],
        queryFn: () => getReportDetail(params.id!),
        retry: 1,
        enabled: !!params.id,
    });

    if (isLoading) {
        return <div>Cargando reporte...</div>;
    }

    if (isError) {
        return <div>El reporte no fue encontrado o ocurrió un error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold">{report?.title}</CardTitle>
                            <CardDescription>ID del Reporte: {report?.id}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge className={`${statusColors[report!.status]} text-white`}>{statusTranslations[report!.status]}</Badge>
                            <Badge className={`${priorityColors[report!.priority]} text-white`}>{priorityTranslations[report!.priority]}</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Descripción</h3>
                            <p className="text-gray-700">{report?.description}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Ubicación</h3>
                            <p className="text-gray-700">{report?.location}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Imágenes del Reporte</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                                {report?.images.map(image => (
                                    <a key={image.id} href={image.url} target="_blank" rel="noopener noreferrer">
                                        <img src={image.url} alt="Imagen del reporte" className="rounded-lg object-cover h-40 w-full hover:opacity-80 transition-opacity" />
                                    </a>
                                ))}
                                {report?.images.length === 0 && <p className="text-gray-500">No hay imágenes para este reporte.</p>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Detalles</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong>Departamento:</strong> {report?.department.name}</p>
                                <p><strong>Creado:</strong> {new Date(report!.createdAt).toLocaleString()}</p>
                                <p><strong>Última Actualización:</strong> {new Date(report!.updatedAt).toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Reportado por</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong>Nombre:</strong> {report?.student.firstName} {report?.student.lastName}</p>
                                <p><strong>Email:</strong> {report?.student.email}</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};