import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";

import { Report } from "@/reports/interfaces/reports.interfaces";
import { AspectRatio, Button, Checkbox } from "@/shared/components";



export const columns: ColumnDef<Report>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        accessorKey: "title",
        header: "Titulo",
    },
    {
        accessorKey: "description",
        header: "Descripción",
        cell: ({ getValue }) => {
            const text = getValue() as string;
            return (
                <div className="2xl:max-w-[420px] md:max-w-[300px] truncate" title={text}>
                    {text}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        cell: ({ getValue }) => {
            const status = getValue() as string;

            const statusTranslations: Record<string, string> = {
                completed: "Completado",
                in_progress: "En progreso",
                pending: "Pendiente",
            };

            return statusTranslations[status] || status;
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Estatus
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            const order: Record<string, number> = {
                "completed": 3,
                "in_progress": 2,
                "pending": 1,
            };

            const a = rowA.getValue(columnId) as string;
            const b = rowB.getValue(columnId) as string;

            return order[a] - order[b];
        },
        enableSorting: true,
        sortDescFirst: true,
    },
    {
        accessorKey: "priority",
        cell: ({ getValue }) => {
            const priority = getValue() as string;

            const priorityTranslations: Record<string, string> = {
                high: "Alta",
                medium: "Media",
                low: "Baja",
            };

            return priorityTranslations[priority] || priority;
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                >
                    Prioridad
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            const order: Record<string, number> = {
                "high": 3,
                "medium": 2,
                "low": 1,
            };

            const a = rowA.getValue(columnId) as string;
            const b = rowB.getValue(columnId) as string;

            return order[a] - order[b];
        },

        enableSorting: true,
        sortDescFirst: true,
    },
    {
        accessorKey: "location",
        header: "Ubicación",
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
    {
        id: "images",
        accessorKey: "images",
        header: "Imagen",
        cell: ({ getValue }) => {
            try {
                const arrayPhotos: Array<{ url: string, id: string }> = getValue() as Array<{ url: string, id: string }>;

                let photo = "";
                if (arrayPhotos[0].url) {
                    photo = arrayPhotos[0].url
                }
                return (

                    <AspectRatio ratio={4 / 5} className="bg-muted rounded-lg">
                        <img
                            src={photo}
                            alt={`Imagen del reporte`}
                            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </AspectRatio>
                )

            } catch (error) {
                console.log(error)
            }
        },

        enableSorting: false,
    },
]