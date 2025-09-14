import { create } from "zustand";
import { Worker } from "../interfaces/worker.response";

interface WorkersState {
  workers: Worker[];
  setWorkers: (workers: Worker[]) => void;
  addWorker: (worker: Worker) => void;
  updateWorker: (worker: Worker) => void;
  deleteWorker: (id: string) => void;
  deleteWorkers: (ids: string[]) => void;
  clearWorkers: () => void;
}

export const useWorkersStore = create<WorkersState>((set) => ({
  workers: [],

  setWorkers: (workers) => set({ workers }),

  addWorker: (worker) =>
    set((state) => ({
      workers: [...state.workers, worker],
    })),

  updateWorker: (worker) =>
    set((state) => ({
      workers: state.workers.map((w) =>
        w.id === worker.id ? { ...w, ...worker } : w
      ),
    })),

  deleteWorker: (id) =>
    set((state) => ({
      workers: state.workers.filter((w) => w.id !== id),
    })),

  deleteWorkers: (ids) =>
    set((state) => ({
      workers: state.workers.filter((w) => !ids.includes(w.id)),
    })),

  clearWorkers: () => set({ workers: [] }),
}));
