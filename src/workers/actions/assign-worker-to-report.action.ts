import {reportsApi} from "@/shared/lib";


export const assignWorkerToReport = async (data: { reportId: string, workerIds: string[] }) => {
    try {
        const {data: dataResponse} = await reportsApi.post("/assignments", data);
        return dataResponse;
    } catch (error) {
        throw error;
    }
}