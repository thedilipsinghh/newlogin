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
        <form onSubmit={handleSubmit(handleLogin)}>
            <input type="text" {...register("name")} />
            <input type="text" {...register("email")} />
            <input type="text" {...register("password")} />
            <button type="submit">Register</button>
        </form>

    </>
}

export default Register