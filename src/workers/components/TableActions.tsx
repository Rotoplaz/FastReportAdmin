import { Button } from "@/shared/components/ui/button"
import { FaPlus } from "react-icons/fa6"
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components";
import { CreateWorkerForm } from "./CreateWorkerForm";
import { FaRegTrashCan } from "react-icons/fa6";

export const TableActions = () => {


    const [dialogOpen, setDialogOpen] = useState(false);


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

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="destructive">
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

                            <Button type="submit" variant="destructive" className="cursor-pointer">
                                Eliminar
                            </Button>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
