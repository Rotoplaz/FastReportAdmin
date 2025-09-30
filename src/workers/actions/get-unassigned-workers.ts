import { reportsApi } from "@/shared/lib";
import { Worker } from "../interfaces/worker.response";


export const getUnassignedWorkers = async (): Promise<Worker[]> => {
  try {
    const { data } = await reportsApi.get<Worker[]>(
      "/users/unassigned"
    );
    const supervisors = data.filter(w => w.role === "supervisor");
    return supervisors;
  } catch (error) {
    console.log(error);
    return [];
  }
};
