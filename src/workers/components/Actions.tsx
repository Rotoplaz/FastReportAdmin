import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa6"
import { z } from "zod"
import { Role } from "../interfaces/worker.response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createNewWorker } from "../use-cases/create-worker.use-case";
import { useState } from "react";

const formSchema = z.object({
    firstName: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().min(1, { message: "Los apellidos son requeridos" }),
    email: z.string().min(1, { message: "El email es requerido" }).email({message: "coloque un correo válido"}),
    code: z.string().min(1, { message: "El código es requerido" }),
    password: z.string({ message: "Introduzca la contraseña" }).min(8, "La contreseña tiene que tener al menos 9 carácteres"),
    role: z.string().min(1, {message: "El rol es requerido"}),
});

const roles = [
    { label: "Supervisor", value: Role.Supervisor },
    { label: "Trabajador", value: Role.Worker },
] as const

export const Actions = () => {


    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            role:""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        createNewWorker(values)
        setDialogOpen(false)
        form.reset()
    }


    return (
        <>
            <Dialog open={dialogOpen}>
                <DialogTrigger asChild onClick={()=>setDialogOpen(true)} >
                    <Button className="cursor-pointer">
                        Añadir Trabajador <FaPlus />
                    </Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Crear Nuevo Trabajador </DialogTitle>
                    </DialogHeader>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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


                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="cursor-pointer" onClick={()=>setDialogOpen(false)}>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className="cursor-pointer">Save changes</Button>
                            </DialogFooter>


                        </form>

                    </Form>


                </DialogContent>

            </Dialog>
        </>
    )
}
