import { Report } from "@/reports/interfaces/reports.interfaces";
import { RecentReport } from "./RecentReport";
import { ScrollArea } from "../ui/scroll-area";
import { RecentReportSkeletons } from "./RecentReportSkeletons";
import { Info } from "lucide-react"; // Importa un ícono para el mensaje
import { Card } from "../ui/card"; // Para el contenedor del mensaje

interface Props {
  reports: Report[];
  isLoading?: boolean;
}

export const RecentReports = ({ reports, isLoading = false }: Props) => {


  return (
    <ScrollArea className="max-h-[550px] overflow-auto">
      {isLoading ? (
        <RecentReportSkeletons count={6} />
      ) : reports.length > 0 ? (
        reports.map(report => (
          <RecentReport 
            key={report.id} 
            report={report}
          />
        ))
      ) : (
          <div className="flex items-center justify-center h-[460px]">
            <Card className="flex flex-col items-center justify-center p-6 gap-2 text-muted-foreground border-none shadow-none">
              <Info className="w-16 h-16" />
              <p className="text-center font-medium text-2xl">
                No hay reportes por hoy
              </p>
            </Card>
          </div>
      )}
    </ScrollArea>
  );
};