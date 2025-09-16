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

interface Props {
    table: Table<Worker>;
}
export const TableActions = ({ table }: Props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpenDelete, setDialogOpenDelete] = useState(false);

    const handleDeleteWorkers = async () => {
        const selectedWorkers = table.getSelectedRowModel().rows.map(row => row.original);

        const selectedIds = selectedWorkers.map(worker => worker.id);

        const ok = await deleteManyUsers(selectedIds);
        if (!ok) {
            toast.error("Error eliminando a los trabajadores", {
                description: "Hubo un error en la eliminación, intente de nuevo.",
            });
            return;
        }

        setDialogOpenDelete(false);
        toast.success("Trabajadores eliminados correctamente.");
    };


    return (
        <div className="flex gap-2">
            <Dialog open={dialogOpen}>
                <DialogTrigger asChild onClick={() => {
                    setDialogOpen(true)
                }} >
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
                    <Button className="cursor-pointer" variant="destructive" onClick={() => {
                        const selectedWorkers = table.getSelectedRowModel().rows.map(row => row.original);
                        if (selectedWorkers.length <= 0) {
                            toast.warning("Favor de seleccionar registros a eliminar.")
                            return;
                        }
                        setDialogOpenDelete(true)
                    }}>
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
                            <Button variant="outline" className="cursor-pointer" onClick={() => setDialogOpenDelete(false)}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" onClick={() => handleDeleteWorkers()} className="cursor-pointer">
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
