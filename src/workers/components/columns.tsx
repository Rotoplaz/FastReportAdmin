import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Button } from "@/shared/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Role, Worker } from "@/workers/interfaces/worker.response"
import { formatDate } from "@/shared/lib"
import { useAuthStore } from "@/shared/store"
import { RoleSelector } from "./RoleSelector"
import { toast } from "sonner"
import { updateRoleWorker } from "../actions/update-role-user.action"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Department } from "@/departments/interfaces/departments-response"
import { SelectDepartment } from "@/departments/components/SelectDepartment"
import { getAllDepartments } from "@/departments/actions/get-all-departments.action"
import { updateWorkerDepartment } from "../actions/update-worker-department.actions"



export const useWorkersColumns = () => {
    const user = useAuthStore(state => state.user);
    const queryClient = useQueryClient();

    const { data: departments = [] } = useQuery<Department[]>({
        queryKey: ["departments", "all"],
        queryFn: getAllDepartments,
    });

    const handleRoleChange = async (workerId: string, newRole: Role) => {
        try {
            await updateRoleWorker(workerId, newRole);
            toast.success("Rol actualizado correctamente.");
            queryClient.invalidateQueries({ queryKey: ["workers"] });

            queryClient.invalidateQueries({ queryKey: ["unassigned-supervisors"] });
        } catch (error) {
            console.log(error)
            toast.error("Error actualizando el rol.", { description: "Intentelo más tarde." })
        }
    }

    const handleDepartmentChange = async (workerId: string, departmentId: string | null) => {
        try {
            await updateWorkerDepartment(workerId, departmentId);
            toast.success("Departamento actualizado correctamente.");
            queryClient.invalidateQueries({ queryKey: ["workers"] });
        } catch (error) {
            console.log(error);
            toast.error("Error actualizando el departamento.", { description: "Inténtelo más tarde." });
        }
    };

    const columns: ColumnDef<Worker>[] = [
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

            cell: ({ row }) => {
                const worker = row.original;
                const role = worker.role;

                if (user?.role === "admin" && user.id !== worker.id) {
                    return (
                        <RoleSelector
                            currentRole={role}
                            workerId={worker.id}
                            onChange={handleRoleChange}
                        />
                    );
                }

                return role === Role.Supervisor ? "Supervisor" : "Trabajador";
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
                if (worker.role === Role.Worker && user?.role === "admin") {
                    return (
                        <SelectDepartment
                            departments={departments}
                            selectedDepartmentId={worker.workerDepartment?.id}
                            onChange={(departmentId) => handleDepartmentChange(worker.id, departmentId)}
                        />
                    )
                }

                if (worker.role === Role.Supervisor && worker.supervisesDepartment) {
                    return worker.supervisesDepartment.name
                }

                if (worker.role === Role.Worker && worker.workerDepartment) {
                    return worker.workerDepartment.name
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
    ]
    const finalColumns =
        user?.role === Role.Supervisor
            ? columns.filter(col => col.id !== "department")
            : columns;
    return finalColumns
}