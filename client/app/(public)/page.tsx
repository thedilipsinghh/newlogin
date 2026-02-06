"use client"
import { useSigninMutation } from "@/redux/api/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"

const Login = () => {
  const router = useRouter()
  const [signin] = useSigninMutation()
  const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })
  type loginType = z.infer<typeof loginSchema>
  const { reset, register, formState: { errors }, handleSubmit } = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })
  const handleLogin = async (data: loginType) => {
    try {
      await signin(data).unwrap()
      toast.success("User login Successfull")
      reset()
      router.push("/admin")
    } catch (error) {
      console.log(error)
      toast.error("Unable to login")
    }
  }
  return <>
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="text" {...register("email")} />
      <input type="text" {...register("password")} />
      <button type="submit">login</button>
    </form>

  </>
}

export default Login