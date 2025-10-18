import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button, Checkbox } from "@/shared/components";
import { Department } from "../interfaces/departments-response";
import { updateDepartment } from "../actions/update-department";
import { getUnassignedWorkers } from "@/workers/actions/get-unassigned-workers";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/shared/lib";
import { SelectWorker } from "../../workers/components/SelectWorker";
import { Worker } from "@/workers/interfaces/worker.response";

export const useDepartmentColumns = (): ColumnDef<Department>[] => {
    
    const queryClient = useQueryClient();

    const { data: supervisors } = useQuery<Worker[]>({
        queryKey: ["unassigned-supervisors"],
        queryFn: getUnassignedWorkers
    });


    const handleSupervisorChange = async (
        departmentId: string,
        selected: Worker | null
    ) => {
        try {
            await updateDepartment(departmentId, { supervisorId: selected?.id || null });

            queryClient.invalidateQueries({ queryKey: ["unassigned-supervisors"] });
            queryClient.invalidateQueries({ queryKey: ["departments"] });
        } catch (error) {
            console.error(error);
            const message =
                error instanceof Error ? error.message : "Error actualizando el supervisor";

            toast.error("Error actualizando el supervisor", {
                description: message,
            });
        }
    };


    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "description",
            header: "Descripción",
            cell: ({ getValue }) => {
                const value = getValue() as string;
                return (
                    <span className="truncate max-w-[250px]" title={value}>
                        {value}
                    </span>
                );
            },
        },
        {
            id: "supervisorName",
            header: "Supervisor",
            cell: ({ row }) => {
                const supervisor = row.original.supervisor;
                const departmentId = row.original.id;

                return (
                    <SelectWorker
                        onChange={(selected) =>
                            handleSupervisorChange(departmentId, selected)
                        }
                        workers={supervisors || []}
                        selectedWorker={
                            supervisor ? supervisor as Worker
                                : null
                        }
                        placeholder={
                            supervisor
                                ? `${supervisor.firstName} ${supervisor.lastName}`
                                : "Seleccionar supervisor"
                        }
                    />
                );
            },
        },
        {
            id: "supervisorEmail",
            header: "Correo del supervisor",
            cell: ({ row }) => {
                const email = row.original.supervisor?.email;
                return (
                    <span className="truncate max-w-[200px]" title={email || ""}>
                        {email || "Sin asignar"}
                    </span>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Fecha de creación
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ getValue }) => {
                const date = new Date(getValue() as string);
                return formatDate(date);
            },
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = new Date(rowA.getValue(columnId) as string).getTime();
                const dateB = new Date(rowB.getValue(columnId) as string).getTime();
                return dateA - dateB;
            },
            enableSorting: true,
            sortDescFirst: true,
        },
    ];
};
