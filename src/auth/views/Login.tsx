import { LoginForm } from "@/auth/components/login-form"
import { cn } from "@/shared/lib"




export const Login = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">


            <div
                className={cn(
                    "absolute inset-0 -z-20",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            >
                <div className="absolute left-90 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                <div className="absolute left-0 right-96 bottom-20 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-700 opacity-20 blur-[100px]"></div>

            </div>

            <div className="w-sm">
                <LoginForm className="bg-white/10 backdrop-blur-xs" />
            </div>
        </div>
    )
}
