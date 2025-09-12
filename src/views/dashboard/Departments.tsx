import { DataTable } from "@/components/dashboard/data-table"
import { columns } from "@/departments/components/table/columns"
import { useDepartments } from "@/departments/hooks/useDepartments"

export const Departments = () => {

  const { data } = useDepartments();

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={data || []}
        />
    </div>
  )
}
