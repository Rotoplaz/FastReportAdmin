import { connectSocket } from "@/shared/lib/socket";
import { useAuthStore } from "@/shared/store/auth/useAuthStore";
import { Worker, WorkersResponse } from "@/workers/interfaces/worker.response";
import { useEffect } from "react";
import { useWorkersStore } from "../store/useStoreWorkers";

export const useWorkers = () => {
  const { jwt } = useAuthStore();
  const {
    workers,
    setWorkers,
    addWorker,
  } = useWorkersStore();

  useEffect(() => {
    const socket = connectSocket("workers", jwt);

    const handleNewWorker = (newWorker: Worker) => {
      addWorker(newWorker);
    };

    socket.on("authenticated", () => {
      socket.emit("getWorkers");
    });

    socket.on("newWorker", handleNewWorker);

    socket.on("workers", (response: WorkersResponse) => {
      setWorkers(response.data);
    });

    return () => {
      socket.off("newWorker", handleNewWorker);
      socket.off("workers");
    };
  }, [jwt, addWorker, setWorkers]);

  return {
    workers,
    
  };
};
