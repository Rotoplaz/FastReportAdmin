import { ErrorResponse } from "@/shared/interfaces/responses";
import { reportsApi } from "@/shared/lib";
import { AxiosError } from "axios";
import { Department } from "../interfaces/departments-response";

export interface UpdateDepartmentPayload {
  name?: string;
  description?: string;
  supervisorId?: string | null;
}

export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentPayload
): Promise<Department> => {
  try {
    const {data: departmentUpdated} = await reportsApi.patch<Department>(`/departments/${id}`, data);
    return departmentUpdated
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const response = error.response.data as ErrorResponse;
      throw new Error(response.message);
    }

    throw new Error("Ocurrió un error inesperado al actualizar el departamento.");
  }
};
