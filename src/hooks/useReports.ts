import { getReports } from "@/reports/actions/get-reports.action";
import {
  GetReportsRequest,
  OverViewMode,
  Report,
} from "@/reports/interfaces/reports.interfaces";
import { socket } from "@/socket-io/socket";
import { useQuery } from "@tanstack/react-query";
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
  const today = new Date();
  const year = today.getFullYear();

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

  const { data: reportsDataOverView } = useQuery({
    queryKey: ["get", "reports", "overview"],
    queryFn: () => getReports({ year, limit: 1_000_000 }),
  });

  useEffect(() => {
    
    socket.emit("getInitialRecentReports");

    const handleInitialReports = (data: GetReportsRequest) => {
      setRecentReports(data.data);
    };

    socket.on("initialRecentReports", handleInitialReports);

    return () => {
      socket.off("getInitialRecentReports", handleInitialReports);
    };
  }, []);

  useEffect(() => {
    socket.emit("getAnnualReports");

    const handleAnnualReports = (data: GetReportsRequest) => {
      setAnnualReports(data.data);
    };

    socket.on("annualReports", handleAnnualReports);

    return () => {
      socket.off("getAnnualReports", handleAnnualReports);
    };
  }, []);

  useEffect(() => {
    socket.emit("getInitiaMetrics");

    const handleInitialMetrics = (data: Metrics) => {
      setMetrics(data);
    };

    socket.on("initialMetrics", handleInitialMetrics);

    return () => {
      socket.off("initialMetrics", handleInitialMetrics);
    };
  }, []);

  useEffect(() => {
    const handleMetrics = (incomingMetrics: Metrics) =>
      setMetrics(incomingMetrics);
    socket.on("metrics", handleMetrics);
    return () => {
      socket.off("metrics", handleMetrics);
    };
  }, []);

  useEffect(() => {
    const handleNewReport = (newReport: Report) => {
      setRecentReports((prev) => [newReport, ...prev]);
      setAnnualReports((prev) => [newReport, ...prev]);
      
    };

    socket.on("newReport", handleNewReport);
    return () => {
      socket.off("newReport", handleNewReport);
    };
  }, []);

  return {
    overViewMode,
    recentReports,
    metrics,
    reportsDataOverView,
    setOverViewMode,
    annualReports
  };
};
