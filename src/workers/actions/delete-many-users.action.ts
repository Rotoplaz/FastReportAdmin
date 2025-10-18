import { ErrorResponse } from "@/shared/interfaces/responses";
import { reportsApi } from "@/shared/lib";
import { AxiosError } from "axios";

export const deleteManyUsers = async (ids: string[]) => {
  try {
    await reportsApi.delete("/users/batch", {
      data: ids,
    });

    return true;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as ErrorResponse;
      throw new Error(data.message);
    }
    throw new Error("Ocurrió un error inesperado al eliminar el trabajador.");
  }
};
