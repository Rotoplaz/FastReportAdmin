import { reportsApi } from "@/api/reports/reports-api";
import { MetricsResponse } from "../interfaces/reports.interfaces";


export const getMetrics = async (): Promise<MetricsResponse | null> => {
    const { data } = await reportsApi.get<MetricsResponse>("/reports/metrics");

    return data
}