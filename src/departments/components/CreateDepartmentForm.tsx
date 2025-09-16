import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/components";
import { toast } from "sonner";
import { useDepartments } from "../hooks/useDepartments";
import { SupervisorComboBox } from "./SupervisorSelector";
import { getUnassignedWorkers, UnassignedWorker } from "@/workers/actions/get-unassigned-workers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  onSubmit?: () => void;
  onCancel?: () => void;
}

export interface Supervisor {
  id: string;
  firstName: string;
  lastName: string;
  role: "supervisor";
}


const createDepartmentSchema = z.object({
  name: z.string().min(1, "El nombre del departamento es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  supervisorId: z.string().uuid().optional().nullable(),
});


export const CreateDepartmentForm = ({ onSubmit, onCancel }: Props) => {

   const queryClient = useQueryClient();
  const { data: supervisors = [] } = useQuery<UnassignedWorker[]>({
    queryKey: ["unassigned-supervisors"],
    queryFn: getUnassignedWorkers,
  });

  const { createDepartment } = useDepartments();
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "",
      description: "",
      supervisorId: undefined,
    },
  });


  const onFormSubmit = async (values: z.infer<typeof createDepartmentSchema>) => {
    const department = await createDepartment({ description: values.description, name: values.name, supervisorId: values.supervisorId || null });
    if (!department) {
      toast.error("Error creando departamento");
      return;
    }

    if (onSubmit) onSubmit();
    form.reset();
    queryClient.invalidateQueries({ queryKey: ["unassigned-supervisors"] });
    toast.success("Departamento creado exitosamente", { description: department.name });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Departamento</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Producción, Recursos Humanos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Breve descripción del departamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supervisorId"
          render={() => {

            return (
              <FormItem className="flex flex-col">
                <FormLabel className="cursor-pointer" >Supervisor (opcional)</FormLabel>
                <SupervisorComboBox
                  supervisors={supervisors}
                  selectedSupervisor={null}
                  onChange={(supervisor) => {
                    form.setValue("supervisorId", supervisor?.id);
                    form.clearErrors("supervisorId");
                  }}
                />
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} className="cursor-pointer">
            Cancelar
          </Button>
          <Button type="submit" className="cursor-pointer">Guardar</Button>
        </div>
      </form>
    </Form>
  );
};
