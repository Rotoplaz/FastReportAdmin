import { reportsApi } from "@/api/reports/reports-api";
import { MetricsResponse } from "../interfaces/reports.interfaces";


export const getMetrics = async (): Promise<MetricsResponse | null> => {
    const { data } = await reportsApi.get<MetricsResponse>("/reports/metrics",{
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNGRkNDkxLTc0MDgtNDNjNC05YTU1LTFjZjlkMzY0NWY2ZCIsImlhdCI6MTc1MjAzNjA2OSwiZXhwIjoxNzUyMDUwNDY5fQ.Bq5TzBvyLDAN_7_yd17HMokIy7nGd0dPASZ5QKk222U"
        }
    });

    return data
}