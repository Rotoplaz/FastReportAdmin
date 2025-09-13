
import { useReports } from "@/reports/hooks/useReports"
import { columns } from "@/reports/components/table/columns"
import { DataTable } from "@/shared/components/dashboard/data-table";

export const Reports = () => {

  const { annualReports } = useReports();

  return (
    <>

      <DataTable columns={columns} data={annualReports} />


    </>
  )
}
