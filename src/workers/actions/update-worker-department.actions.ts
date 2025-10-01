import { ErrorResponse } from "@/shared/interfaces/responses";
import { reportsApi } from "@/shared/lib"
import { AxiosError } from "axios";
import { Worker } from "../interfaces/worker.response";



export const updateWorkerDepartment = async (workerId: string, departmentId: string | null): Promise<Worker> => {
    try {
        const { data } = await reportsApi.patch<Worker>(`/users/${workerId}`, { departmentId });

        return data
    } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as ErrorResponse;
      throw new Error(data.message);
    }

    throw new Error("Ocurrió un error inesperado al actualizar el departamento.");
    }
}