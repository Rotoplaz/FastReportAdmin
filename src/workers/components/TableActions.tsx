import { Button } from "@/shared/components/ui/button"
import { FaPlus } from "react-icons/fa6"
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components";
import { CreateWorkerForm } from "./CreateWorkerForm";
import { FaRegTrashCan } from "react-icons/fa6";
import { Table } from "@tanstack/react-table";
import { Worker } from "../interfaces/worker.response";
import { toast } from "sonner";
import { deleteManyUsers } from "../actions/delete-many-users.action";
import { useWorkersStore } from "../store/useStoreWorkers";

interface Props {
    table: Table<Worker>;
}
export const TableActions = ({ table }: Props) => {
    const { deleteWorkers: deleteWorkersStore } = useWorkersStore();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
    
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
        deleteWorkersStore(ids);

        toast.success("Trabajadores eliminados correctamente.");
    };

    const handleDelete = () => {
        const selectedWorkers = table.getSelectedRowModel().rows.map(row => row.original);
        const selectedIds = selectedWorkers.map(worker => worker.id);
        deleteWorkers(selectedIds);
        table.resetRowSelection();
    };

    return (
        <div className="flex gap-2">
            <Dialog open={dialogOpen}>
                <DialogTrigger asChild onClick={() => setDialogOpen(true)} >
                    <Button className="cursor-pointer">
                        <FaPlus /> Añadir Trabajador
                    </Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Crear Nuevo Trabajador</DialogTitle>
                    </DialogHeader>

                    <CreateWorkerForm onCancel={() => setDialogOpen(false)} onSubmit={() => setDialogOpen(false)} />

                </DialogContent>
            </Dialog>

            <Dialog open={dialogOpenDelete}>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="destructive" onClick={() => setDialogOpenDelete(true)}>
                        <FaRegTrashCan /> Eliminar Trabajadores
                    </Button>
                </DialogTrigger>

                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>¿Seguro de eliminar a los trabajadores seleccionados?</DialogTitle>
                        <DialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente los trabajadores seleccionados del sistema.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" onClick={() => { handleDelete(); setDialogOpenDelete(false); }} className="cursor-pointer">
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
