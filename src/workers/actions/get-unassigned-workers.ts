import { reportsApi } from "@/shared/lib";
import { Worker } from "../interfaces/worker.response";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/interfaces/responses";

export const getUnassignedWorkers = async (): Promise<Worker[]> => {
  try {
    const { data } = await reportsApi.get<Worker[]>("/users/unassigned");
    const supervisors = data.filter((w) => w.role === "supervisor");
    return supervisors;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as ErrorResponse;
      throw new Error(data.message);
    }
    throw new Error("Ocurrió un error inesperado al eliminar el trabajador.");
  }
};
