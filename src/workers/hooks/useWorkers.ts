import { connectSocket } from "@/shared/lib/socket";
import { useAuthStore } from "@/shared/store/auth/useAuthStore";
import { Worker, WorkersResponse } from "@/workers/interfaces/worker.response";
import { useEffect, useState } from "react";

export const useWorkers = () => {
  const { jwt } = useAuthStore();
  const [workers, setWorkers] = useState<Worker[]>([]);


  useEffect(() => {
    const socket = connectSocket("workers", jwt);

    const handleNewWorker = (newWorker: Worker) => {
      setWorkers((prev) => [newWorker, ...prev]);
    };

    const handleOnDeleteWorkers = (ids: string[]) => {
      setWorkers((prev) => prev.filter((w) => !ids.includes(w.id)));
    }

    socket.on("authenticated", () => {
      socket.emit("getWorkers");
    });

    socket.on("newWorker", handleNewWorker);
    socket.on("deleteWorkers", handleOnDeleteWorkers);

    socket.on("workers", (response: WorkersResponse) => {
      setWorkers(response.data);
    });

    return () => {
      socket.off("newWorker", handleNewWorker);
      socket.off("workers");
      socket.off("deleteWorkers", handleOnDeleteWorkers);
    };
  }, [jwt]);

  return {
    workers,
  };
};
