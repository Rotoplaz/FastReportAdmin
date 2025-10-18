import { reportsApi } from "@/shared/lib/api/reports-api";
import { Worker } from "../interfaces/worker.response";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/interfaces/responses";

interface WorkerData {
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  password: string;
  role: string;
}

export const createNewWorker = async (
  workerData: WorkerData
): Promise<Worker> => {
  try {
    const { data } = await reportsApi.post<Worker>("/users", workerData);

    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as ErrorResponse;
      throw new Error(data.message);
    }
    throw new Error("Ocurrió un error inesperado al crear el trabajador.")
  }
};
