import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Button } from "@/shared/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Role, Worker } from "@/workers/interfaces/worker.response"

export const columns: ColumnDef<Worker>[] = [
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
        accessorKey: "firstName",
        header: "Nombre",
    },
    {
        accessorKey: "lastName",
        header: "Apellido",
    },
    {
        accessorKey: "email",
        header: "Correo",
        cell: ({ getValue }) => {
            const email = getValue() as string
            return (
                <span className="truncate max-w-[200px]" title={email}>
                    {email}
                </span>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Rol
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ getValue }) => {
            const role = getValue() as Role
            return role === Role.Supervisor ? "Supervisor" : "Trabajador"
        },
        sortingFn: (rowA, rowB, columnId) => {
            const order: Record<Role, number> = {
                [Role.Supervisor]: 2,
                [Role.Worker]: 1,
            }

            const a = rowA.getValue(columnId) as Role
            const b = rowB.getValue(columnId) as Role

            return order[a] - order[b]
        },
        enableSorting: true,
        sortDescFirst: true,
    },
    {
        id: "department",
        header: "Departamento",
        cell: ({ row }) => {
            const worker = row.original
            if (worker.role === Role.Worker && worker.workerDepartment) {
                return worker.workerDepartment.name
            }
            if (worker.role === Role.Supervisor && worker.supervisesDepartment) {
                return worker.supervisesDepartment.name
            }
            return "-"
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Fecha de creación
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ getValue }) => {
            const date = new Date(getValue() as string);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
        sortingFn: (rowA, rowB, columnId) => {
            const dateA = new Date(rowA.getValue(columnId) as string).getTime();
            const dateB = new Date(rowB.getValue(columnId) as string).getTime();

            return dateA - dateB;
        },
        enableSorting: true,
        sortDescFirst: true,
    },
]
