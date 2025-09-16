

import { z } from "zod"
import { createNewWorker } from "../actions/create-worker.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "../interfaces/worker.response";
import { Button, Command, CommandGroup, CommandItem, CommandList, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { cn } from "@/shared/lib";
import { Check } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
    firstName: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().min(1, { message: "Los apellidos son requeridos" }),
    email: z.string().min(1, { message: "El email es requerido" }).email({ message: "coloque un correo válido" }),
    code: z.string().min(1, { message: "El código es requerido" }),
    password: z.string({ message: "Introduzca la contraseña" }).min(8, "La contreseña tiene que tener al menos 9 carácteres"),
    role: z.string().min(1, { message: "El rol es requerido" }),
});


const roles = [
    { label: "Supervisor", value: Role.Supervisor },
    { label: "Trabajador", value: Role.Worker },
] as const


interface Props {
    onSubmit?: () => void;
    onCancel?: () => void;
}


export const CreateWorkerForm = ({ onCancel, onSubmit }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            role: ""
        }
    });


    const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
        const worker = await createNewWorker(values);
        if(!worker){
            toast.error("Error Creando usuario, intente mas tarde.")
            return;
        }
        if (onSubmit) {
            onSubmit()
        }
        form.reset()
        toast.success("Trabajador creado exitosamente", { description: `${worker?.firstName} ${worker?.lastName}` })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3 ">

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nombre del trabajador" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellidos</FormLabel>
                                    <FormControl>
                                        <Input placeholder="apellido del trabajador" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="ejemplo@ejemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-3 ">

                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Código</FormLabel>
                                    <FormControl>
                                        <Input placeholder="código del trabajador" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Rol</FormLabel>
                                        <Popover>

                                            <PopoverTrigger asChild>
                                                <FormControl>

                                                    <Button variant="outline" className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )} role="combobox" >
                                                        {field.value ? <>{roles.find(rol => rol.value === field.value)?.label}</> : <>Seleccionar rol</>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0" align="start" style={{ pointerEvents: "auto" }}>
                                                <Command>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {roles.map((rol) => (
                                                                <CommandItem
                                                                    key={rol.label}
                                                                    value={rol.value}
                                                                    onSelect={() => {
                                                                        form.setValue("role", rol.value)
                                                                        form.clearErrors("role");
                                                                    }}
                                                                >
                                                                    {rol.label}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            rol.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
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
                                )
                            }}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="intruduzca la contreseña" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2 justify-end">

                        <Button variant="outline" className="cursor-pointer" type="button" onClick={() => onCancel && onCancel()}>Cancelar</Button>
                        <Button type="submit" className="cursor-pointer">Guardar</Button>
                    </div>


                </form>

            </Form>
        </>

    )
}
