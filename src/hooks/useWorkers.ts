import { connectSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth/useAuthStore";
import {  Worker, WorkersResponse } from "@/workers/interfaces/worker.response";
import { useEffect, useState } from 'react';

export const useWorkers = () => {

  const [workers, setWorkers] = useState<Worker[]>([])
  const { jwt } = useAuthStore();

  useEffect(() => {
    const socket = connectSocket("workers", jwt);
    
    socket.on("authenticated", () => {
      socket.emit("getWorkers");
    });

    socket.on("newWorker", (newWorker: Worker) => {
      setWorkers((oldState)=>[newWorker, ...oldState])
    });

    socket.on("workers", (response: WorkersResponse) => {
      setWorkers(response.data)
    });
    
    return () => {
      socket.off("workers")
      socket.off("newWorker")
      socket.off("authenticated")
    };
  }, [jwt]);

  return {
    workers
  };
};
