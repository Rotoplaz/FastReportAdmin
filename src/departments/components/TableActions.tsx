
import { Table } from "@tanstack/react-table";
import { Department } from "../interfaces/departments-response";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components";
import { CreateWorkerForm } from "@/workers/components/CreateWorkerForm";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  table: Table<Department>
}

export const TableActions = ({ table }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);

  return (
    <div className="flex gap-2">
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild onClick={() => {
          setDialogOpen(true)
        }} >
          <Button className="cursor-pointer">
            <FaPlus /> Añadir Departamento
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
            <FaRegTrashCan /> Eliminar Departamentos
          </Button>
        </DialogTrigger>

        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>¿Seguro de eliminar a los departamentos seleccionados?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente los departamentos seleccionados del sistema.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer" onClick={() => setDialogOpenDelete(false)}>
                Cancelar
              </Button>
            </DialogClose>

            <Button variant="destructive" onClick={() => {}} className="cursor-pointer">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
