import { reportsApi } from "@/shared/lib/api/reports-api";
import { Worker } from "../interfaces/worker.response";

interface WorkerData {
    firstName: string;
    lastName:  string;
    email:     string;
    code:      string;
    password:  string;
    role:      string;
}


export const createNewWorker = async (workerData: WorkerData): Promise<Worker | null> => {
    
    try {
        const { data } = await reportsApi.post<Worker>("/users", workerData);

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }

}