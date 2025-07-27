import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { login as loginAction } from "@/auth/actions/login"
import { useAuthStore } from "@/store/auth/useAuthStore"
import { Navigate, redirect } from "react-router"

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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
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
                          <FormDescription>
                            <a
                              href="#"
                              className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </a>

                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                  <Button type="submit" className="w-full cursor-pointer">
                    Inicias Sesion
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
