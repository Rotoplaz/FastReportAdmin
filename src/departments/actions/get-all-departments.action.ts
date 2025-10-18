import { reportsApi } from "@/shared/lib";
import { Department, DepartmentsResponse } from "../interfaces/departments-response";


export const getAllDepartments = async (): Promise<Department[]> => {
    try {
        const { data: response } = await reportsApi.get<DepartmentsResponse>(
          "/departments"
        );
        return response.data;
        
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching departments");
    }
};
