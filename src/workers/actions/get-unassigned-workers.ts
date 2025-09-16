import { reportsApi } from "@/shared/lib";

export interface UnassignedWorker {
  firstName: string;
  lastName: string;
  role: string;
  id: string;
}

export const getUnassignedWorkers = async (): Promise<UnassignedWorker[]> => {
  try {
    const { data } = await reportsApi.get<UnassignedWorker[]>(
      "/users/unassigned"
    );
    const supervisors = data.filter(w => w.role === "supervisor");
    return supervisors;
  } catch (error) {
    console.log(error);
    return [];
  }
};
