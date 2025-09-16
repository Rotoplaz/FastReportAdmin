import { ErrorResponse } from "@/shared/interfaces/responses";
import { reportsApi } from "@/shared/lib";
import { AxiosError } from "axios";

export const deleteManyDepartments = async (ids: string[]): Promise<string[]> => {
  try {
    await reportsApi.delete("/departments/batch", {
      data: {ids},
    });
    return ids;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as ErrorResponse;
      throw new Error(data.message);
    }

    throw new Error("Ocurrió un error inesperado al eliminar los departamentos.");
  }
};
