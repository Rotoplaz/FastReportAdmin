
import { columns } from "@/departments/components/columns"
import { useDepartments } from "@/departments/hooks/useDepartments"
import { DataTable } from "@/shared/components/dashboard/data-table";
import { TableActions } from "../components/TableActions";

export const Departments = () => {

  const { data } = useDepartments();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        actions={(table) => <TableActions table={table} />}
      />
    </div>
  )
}
