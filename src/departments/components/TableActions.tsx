
import { Table } from "@tanstack/react-table";
import { Department } from "../interfaces/departments-response";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { useState } from "react";
import { CreateDepartmentForm } from "./CreateDepartmentForm";
import { useDepartments } from "../hooks/useDepartments";

interface Props {
  table: Table<Department>
}

export const TableActions = ({ table }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const { deleteDepartments } = useDepartments();

  const handleDeleteDepartments = async () => {
    const selectedWorkers = table.getSelectedRowModel().rows.map(row => row.original);
    const selectedIds = selectedWorkers.map(worker => worker.id);

    try {
      const deletedIds = await deleteDepartments(selectedIds);

      if (!deletedIds.length) {
        throw new Error("No departments were deleted.");
      }

      setDialogOpenDelete(false);
      toast.success("Departamentos eliminados correctamente.");
    } catch (error) {
      console.log(error);

      const message =
        error instanceof Error ? error.message : "Error eliminando los departamentos";

      toast.error("Error eliminando a los departamentos", {
        description: message,
      });
    }
  };


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
            <DialogTitle>Crear Nuevo Departamento</DialogTitle>
          </DialogHeader>

          <CreateDepartmentForm onCancel={() => setDialogOpen(false)} onSubmit={() => { 
            setDialogOpen(false) 
            table.resetRowSelection();
          }} />

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

            <Button variant="destructive" onClick={() => handleDeleteDepartments()} className="cursor-pointer">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
