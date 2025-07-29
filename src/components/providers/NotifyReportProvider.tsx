import { ReactNode, useEffect } from "react"
import { socket } from "@/socket-io/socket"
import { Report } from "@/reports/interfaces/reports.interfaces"
import { toast } from "sonner"

export function NotifyReportProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    socket.connect()

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
