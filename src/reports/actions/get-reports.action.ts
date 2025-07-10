import { reportsApi } from "@/api/reports/reports-api";
import { GetReportsRequest, Report } from "../interfaces/reports.interfaces";


export const getReports = async (): Promise<Report[]> => {

    const { data } = await reportsApi.get<GetReportsRequest>("/reports");

    return data.data;
}