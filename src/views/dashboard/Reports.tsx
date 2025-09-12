import { DataTable } from "@/components/dashboard/data-table"
import { useReports } from "@/hooks/useReports"
import { columns } from "@/reports/components/table/columns"

export const Reports = () => {

  const { annualReports } = useReports();

  return (
    <>

      <DataTable columns={columns} data={annualReports} />


    </>
  )
}
