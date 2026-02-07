"use client"
import { useSignupMutation } from "@/redux/api/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"

const Register = () => {
    const router = useRouter()
    const [signup] = useSignupMutation()
    const registerSchema = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
    })
    type registerType = z.infer<typeof registerSchema>
    const { reset, register, formState: { errors }, handleSubmit } = useForm<registerType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(registerSchema)
    })
    const handleLogin = async (data: registerType) => {
        try {
            await signup(data).unwrap()
            reset()
            toast.success("Register Successfull")
            router.push("/")
        } catch (error) {
            console.log(error)
            toast.error("Unable to register")
        }
    }
    return <>
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg space-y-5"
        >
            <h2 className="text-2xl font-semibold text-center">Register</h2>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Name</label>
                <input
                    type="text"
                    {...register("name")}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Password</label>
                <input
                    type="password"
                    {...register("password")}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Register
            </button>
        </form>


    </>
}

export default Register