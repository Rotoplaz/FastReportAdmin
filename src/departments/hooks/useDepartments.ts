import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Department } from "../interfaces/departments-response";
import { createDepartment } from "../actions/create-department.action";
import { deleteManyDepartments } from "../actions/delete-many-departments.action";
import { getAllDepartments } from "../actions/get-all-departments.action";

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const getDepartmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
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
