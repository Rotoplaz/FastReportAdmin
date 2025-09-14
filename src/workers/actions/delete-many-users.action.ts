import { reportsApi } from "@/shared/lib";


export const deleteManyUsers = async (ids: string[]): Promise<boolean> => {
    try {
        await reportsApi.delete("/users/batch", {
            data: ids
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}