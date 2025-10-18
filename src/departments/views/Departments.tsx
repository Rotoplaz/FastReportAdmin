

import { useDepartments } from "@/departments/hooks/useDepartments"
import { DataTable } from "@/shared/components/dashboard/data-table";
import { TableActions } from "../components/TableActions";
import { useDepartmentColumns } from "../components/columns";

export const Departments = () => {

  const { getDepartmentsQuery } = useDepartments();
  const columns = useDepartmentColumns();
  return (
    <div>
      <DataTable
        columns={columns}
        data={getDepartmentsQuery.data || []}
        actions={(table) => <TableActions table={table} />}
      />
    </div>
  )
}
