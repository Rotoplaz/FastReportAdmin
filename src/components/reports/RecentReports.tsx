import { Report } from "@/reports/interfaces/reports.interfaces";
import { RecentReport } from "./RecentReport";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  reports: Report[];
}
export const RecentReports = ({ reports }:Props) =>  {
    return (
      <ScrollArea className="max-h-[550px] overflow-auto" >
        {reports.map(report => (
          <RecentReport 
            key={report.id} 
            report={report}
          />
        ))}
      </ScrollArea>
    );
  }