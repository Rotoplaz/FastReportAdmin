import { reportsApi } from "@/shared/lib";
import { Department } from "../interfaces/departments-response"


interface Props {
    name: string;
    description: string;
    supervisorId: string | null;
}

export const createDepartment = async(data: Props): Promise<Department> => {
    try {
        const { data: department } = await reportsApi.post<Department>("/departments", data);

        return department;
    } catch (error) {
        console.log(error)
        throw new Error("The department was not created");
    }
}