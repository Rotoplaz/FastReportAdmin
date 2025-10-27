import {reportsApi} from "@/shared/lib";
import { Worker } from "../interfaces/worker.response";

interface GetWorkersByDepartmentIdResponse {
    data: Worker[];
}


export const getWorkersByDepartmentId = async (departmentId: string): Promise<Worker[]> => {
    try{
        const {data:dataResponse} = await reportsApi.get<GetWorkersByDepartmentIdResponse>(`/workers/department/${departmentId}`);

        return dataResponse.data;
    }
    catch(err){
        throw err;
    }
}