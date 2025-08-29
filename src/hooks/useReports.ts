import {
  GetReportsRequest,
  OverViewMode,
  Report,
} from "@/reports/interfaces/reports.interfaces";
import { connectSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect, useState } from "react";

interface Metrics {
  highPriorityReports: number;
  lowPriorityReports: number;
  mediumPriorityReports: number;
  reportsCompleted: number;
  reportsInProgress: number;
  reportsPending: number;
  totalReports: number;
}

export const useReports = () => {
  const jwt = useAuthStore((state) => state.jwt);
  const [overViewMode, setOverViewMode] = useState<OverViewMode>(
    OverViewMode.year_to_date
  );
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [annualReports, setAnnualReports] = useState<Report[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalReports: 0,
    reportsInProgress: 0,
    reportsPending: 0,
    reportsCompleted: 0,
    highPriorityReports: 0,
    lowPriorityReports: 0,
    mediumPriorityReports: 0,
  });

  useEffect(() => {
    if (!jwt) return;
    const socket = connectSocket("reports", jwt);

    const handleInitialReports = (response: GetReportsRequest) =>
      setRecentReports(response.data);
    const handleAnnualReports = (response: GetReportsRequest) =>
      setAnnualReports(response.data);
    const handleMetrics = (incomingMetrics: Metrics) =>
      setMetrics(incomingMetrics);
    const handleNewReport = (newReport: Report) => {
      setRecentReports((prev) => [newReport, ...prev]);
      setAnnualReports((prev) => [newReport, ...prev]);
    };

    socket.on("initialRecentReports", handleInitialReports);
    socket.on("annualReports", handleAnnualReports);
    socket.on("metrics", handleMetrics);
    socket.on("newReport", handleNewReport);

    socket.on("authenticated", () => {
      socket.emit("getInitialRecentReports");
      socket.emit("getAnnualReports");
      socket.emit("getInitialMetrics");
    });

    return () => {
      socket.off("initialRecentReports", handleInitialReports);
      socket.off("annualReports", handleAnnualReports);
      socket.off("initialMetrics", handleMetrics);
      socket.off("metrics", handleMetrics);
      socket.off("newReport", handleNewReport);
      socket.disconnect();
    };
  }, [jwt]);

  return {
    overViewMode,
    setOverViewMode,
    recentReports,
    annualReports,
    metrics,
  };
};
