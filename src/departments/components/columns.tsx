import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button, Checkbox } from "@/shared/components";
import { Department } from "../interfaces/departments-response";

export const columns: ColumnDef<Department>[] = [
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
            if (!supervisor) {
                return `Sin asignar`;
            }
            return `${supervisor.firstName} ${supervisor.lastName}`;
        },
    },
    {
        id: "supervisorEmail",
        header: "Correo del supervisor",
        cell: ({ row }) => {
           const supervisor = row.original.supervisor;
            if (!supervisor) {
                return `Sin asignar`;
            }
            const email = supervisor.email;

            return (
                <span className="truncate max-w-[200px]" title={email}>
                    {email}
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
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
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
];
