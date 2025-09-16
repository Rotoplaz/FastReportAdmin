import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";

import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components";
import { Check } from "lucide-react";
import { cn, reportsApi } from "@/shared/lib";
import { toast } from "sonner";

interface Props {
  onSubmit?: () => void;
  onCancel?: () => void;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: "supervisor" | "worker";
}


const createDepartmentSchema = z.object({
  name: z.string().min(1, "El nombre del departamento es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  supervisorId: z.string().uuid().optional(),
});


export const CreateDepartmentForm = ({ onSubmit, onCancel }: Props) => {
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "",
      description: "",
      supervisorId: undefined,
    },
  });

  const [availableSupervisors, setAvailableSupervisors] = useState<User[]>([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const res = await reportsApi.get<User[]>("/users/unassigned");
        const supervisors = res.data.filter((user) => user.role === "supervisor");
        console.log(supervisors)
        setAvailableSupervisors(supervisors);
      } catch (error) {
        console.error("Error al obtener supervisores sin departamento", error);
      }
    };

    fetchSupervisors();
  }, []);

  const onFormSubmit = async (values: z.infer<typeof createDepartmentSchema>) => {
    // const department = await createNewDepartment(values);
    // if (!department) {
    //   toast.error("Error creando departamento");
    //   return;
    // }

    // if (onSubmit) onSubmit();
    // form.reset();
    // toast.success("Departamento creado exitosamente", { description: department.name });
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
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="cursor-pointer" >Supervisor (opcional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between truncate cursor-pointer",
                        !field.value && "text-muted-foreground"
                      )}
                      role="combobox"
                    >
                      {field.value
                        ? (() => {
                          const user = availableSupervisors.find((user) => user.id === field.value);
                          return user ? `${user.firstName} ${user.lastName}` : "";
                        })()
                        : "Seleccionar supervisor"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start" style={{ pointerEvents: "auto" }}>
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          value="none"
                          onSelect={() => {
                            form.setValue("supervisorId", undefined);
                            form.clearErrors("supervisorId");
                          }}
                          className="cursor-pointer"
                        >
                          Sin supervisor
                          <Check
                            className={cn(
                              "ml-auto",
                              !field.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>

                        {availableSupervisors.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.id}
                            onSelect={() => {
                              form.setValue("supervisorId", user.id);
                              form.clearErrors("supervisorId");
                            }}
                            className="cursor-pointer"
                          >
                            {user.firstName}
                            <Check
                              className={cn(
                                "ml-auto",
                                user.id === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
};
