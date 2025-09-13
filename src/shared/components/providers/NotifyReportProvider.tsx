import { ReactNode, useEffect } from "react"
import { Report } from "@/reports/interfaces/reports.interfaces"
import { toast } from "sonner"
import { connectSocket } from "@/shared/lib/socket";
import { useAuthStore } from "@/shared/store/auth/useAuthStore";

export function NotifyReportProvider({ children }: { children: ReactNode }) {
  const jwt = useAuthStore(state=>state.jwt);
  useEffect(() => {
    const socket = connectSocket("reports", jwt);

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
  }, [jwt])

  return <>{children}</>
}
