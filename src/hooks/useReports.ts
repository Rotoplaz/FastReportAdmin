import {
  GetReportsRequest,
  OverViewMode,
  Report,
} from "@/reports/interfaces/reports.interfaces";
import { connectSocket } from "@/socket-io/socket";
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
    const socket = connectSocket("reports");
    socket.emit("getInitialRecentReports");
    socket.emit("getAnnualReports");
    socket.emit("getInitiaMetrics");

    const handleInitialReports = (data: GetReportsRequest) =>
      setRecentReports(data.data);
    const handleAnnualReports = (data: GetReportsRequest) =>
      setAnnualReports(data.data);
    const handleInitialMetrics = (data: Metrics) => setMetrics(data);
    const handleMetrics = (incomingMetrics: Metrics) =>
      setMetrics(incomingMetrics);
    const handleNewReport = (newReport: Report) => {
      setRecentReports((prev) => [newReport, ...prev]);
      setAnnualReports((prev) => [newReport, ...prev]);
    };

    socket.on("initialRecentReports", handleInitialReports);
    socket.on("annualReports", handleAnnualReports);
    socket.on("initialMetrics", handleInitialMetrics);
    socket.on("metrics", handleMetrics);
    socket.on("newReport", handleNewReport);

    return () => {
      socket.off("initialRecentReports", handleInitialReports);
      socket.off("annualReports", handleAnnualReports);
      socket.off("initialMetrics", handleInitialMetrics);
      socket.off("metrics", handleMetrics);
      socket.off("newReport", handleNewReport);
      socket.disconnect();
    };
  }, []);

  return {
    overViewMode,
    setOverViewMode,
    recentReports,
    annualReports,
    metrics,
  };
};
