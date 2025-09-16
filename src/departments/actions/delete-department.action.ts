import { reportsApi } from "@/shared/lib"



export const deleteDepartment = async (id: string) => {
    try {
        await reportsApi.delete(`/departments/${id}`);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting department");
    }
}