import { ReactNode, useEffect } from "react"
import { Report } from "@/reports/interfaces/reports.interfaces"
import { toast } from "sonner"
import { connectSocket } from "@/socket-io/socket";

export function NotifyReportProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const socket = connectSocket("reports");

    const handleNewReport = (newReport: Report) => {
      toast.info(newReport.title, {
        description: newReport.description,
      })
    }

    socket.on("newReport", handleNewReport)

    return () => {
      socket.off("newReport", handleNewReport)
      socket.disconnect()
    }
  }, [])

  return <>{children}</>
}
