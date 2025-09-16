
import { useWorkers } from "@/workers/hooks/useWorkers"
import { DataTable } from "@/shared/components/dashboard/data-table";
import { TableActions, columns } from "@/workers/components";

export const Workers = () => {

  const { workers } = useWorkers();

  return (
    <div>

      <DataTable
        columns={columns}
        data={workers}
        actions={(table)=><TableActions table={table} />}

      />
    </div>
  )
}
