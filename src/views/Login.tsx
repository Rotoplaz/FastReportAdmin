import { LoginForm } from "@/components/dashboard/login-form"



export const Login = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-40 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                <div className="absolute -left-50 right-0 bottom-20 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-700 opacity-20 blur-[100px]"></div>
            </div>

            <div className="w-3/12">
                <LoginForm />
            </div>
        </div>
    )
}
