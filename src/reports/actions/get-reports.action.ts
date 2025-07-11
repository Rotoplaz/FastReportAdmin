import { reportsApi } from "@/api/reports/reports-api";
import { GetReportsRequest, Report } from "../interfaces/reports.interfaces";


interface Params {
    year?:number;
    month?: number;
    day?: number;
}

export const getReports = async (params?: Params): Promise<Report[]> => {
    try {
        const { data } = await reportsApi.get<GetReportsRequest>("/reports",{
            params
        });

        return data.data;
        
    } catch (error) {

        console.log(error);
        return []
    }

}