import { connectSocket } from "@/shared/lib/socket";
import { useAuthStore } from "@/shared/store/auth/useAuthStore";
import { Worker, WorkersResponse } from "@/workers/interfaces/worker.response";
import { useEffect, useState, useCallback } from "react";
import { deleteManyUsers } from "../actions/delete-many-users.action";
import { toast } from "sonner";

export const useWorkers = () => {
  const { jwt } = useAuthStore();
  const [workers, setWorkers] = useState<Worker[]>([]);

  const removeWorkers = useCallback((ids: string[]) => {
    setWorkers((prev) => prev.filter((w) => !ids.includes(w.id)));
  }, []);

  const deleteWorkers = async (ids: string[]) => {
    if (ids.length === 0) {
      toast.warning("No seleccionaste ningún trabajador para eliminar.");
      return;
    }

    const ok = await deleteManyUsers(ids);
    if (!ok) {
      toast.error("Error eliminando a los trabajadores", {
        description: "Hubo un error en la eliminación, intente de nuevo.",
      });
      return;
    }

    removeWorkers(ids);
    toast.success("Trabajadores eliminados correctamente.");
  };

  useEffect(() => {
    const socket = connectSocket("workers", jwt);
    const handleNewWorker = (newWorker: Worker) => {
      setWorkers((prev) => [newWorker, ...prev]);
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
  }, [jwt]);

  return {
    workers,
    deleteWorkers,
  };
};
