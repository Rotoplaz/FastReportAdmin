import { Navigate, redirect } from "react-router" 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { login as loginAction } from "@/auth/actions"

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components"
import { useAuthStore } from "@/shared/store"
import { cn } from "@/shared/lib"


const formSchema = z.object({
  code: z.string({ message: "el codigo es requerido" }),
  password: z.string({ message: "introduzca la contraseña" })
});


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, isAuthenticated } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await loginAction(values);
    if (!data) {
      throw "Error al inicias sesion."
    }
    login(data);
    redirect("/")
  }

  if(isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
      <Card className={cn("flex flex-col gap-6", className)} {...props}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Solo personal autorizado.</CardTitle>
          <CardDescription>

          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>


            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              <div className="grid gap-6">

                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Codigo</FormLabel>
                          <FormControl>
                            <Input placeholder="2135489" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="escribe tu contraseña aqui..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                  <Button type="submit" className="w-full cursor-pointer">
                    Inicias Sesion
                  </Button>
                </div>

              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

  )
}
