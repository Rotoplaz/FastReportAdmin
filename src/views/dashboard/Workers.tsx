
import { DataTable } from "@/components/dashboard/data-table"
import { useWorkers } from "@/hooks/useWorkers"
import { columns } from "@/workers/components/table/columns"

export const Workers = () => {
  
  const { workers } = useWorkers();
  
  return (
    <div>
      <DataTable columns={columns} data={workers} />
    </div>
  )
}
