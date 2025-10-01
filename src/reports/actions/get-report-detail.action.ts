import { reportsApi } from "@/shared/lib"
import { Report } from "../interfaces/reports.interfaces"


export const getReportDetail = async (id: string): Promise<Report> => {
    try {
        const { data:report } = await reportsApi.get<Report>(`/reports/${id}`)

        return report
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener el detalle del reporte")
    }
}