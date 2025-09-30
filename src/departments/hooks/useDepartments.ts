import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Department,
  DepartmentsResponse,
} from "../interfaces/departments-response";
import { reportsApi } from "@/shared/lib";
import { createDepartment } from "../actions/create-department.action";
import { deleteManyDepartments } from "../actions/delete-many-departments.action";

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const getDepartmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: async (): Promise<Department[]> => {
      const { data: response } = await reportsApi.get<DepartmentsResponse>(
        "/departments"
      );
      return response.data;
    },
  });

  const createDepartmentQuery = useMutation({
    mutationFn: createDepartment,
    onSuccess: (newDepartment: Department) => {
      queryClient.setQueryData<Department[]>(["departments"], (old) =>
        old ? [...old, newDepartment] : [newDepartment]
      );
    },
  });

  const deleteDepartmentQuery = useMutation({
    mutationFn: deleteManyDepartments,
    onSuccess: (_, deletedIds) => {
      queryClient.setQueryData<Department[]>(
        ["departments"],
        (old) => old?.filter((dept) => !deletedIds.includes(dept.id)) ?? []
      );
    },
  });

  return {
    getDepartmentsQuery,
    createDepartmentQuery,
    deleteDepartmentQuery,
  };
};
