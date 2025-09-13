import { useQuery } from "@tanstack/react-query"
import { Department, DepartmentsResponse } from "../interfaces/departments-response"
import { reportsApi } from "@/shared/lib";



export const useDepartments = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async (): Promise<Department[]> => {
        const { data: dataResponse } = await reportsApi.get<DepartmentsResponse>("/departments");
        return dataResponse.data;
    },
  });



  return {
    data,
    isLoading
  }

}