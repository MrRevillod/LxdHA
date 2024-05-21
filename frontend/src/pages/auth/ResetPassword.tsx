
import { z } from "zod"
import { Input } from "../../components/ui/Input"
import { useAuth } from "../../store/AuthContext"
import { Loading } from "../Loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { useHttpStore } from "../../store/HttpStore"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { RequestResetPasswordData } from "../../lib/types"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const passwordSchema = z.object({
    password: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(30, { message: "La contraseña debe tener menos de 30 caracteres" })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,30}$/, { message: "La contraseña debe tener al menos un número, una letra mayúscula, una minúscula y un carácter especial" }),

    confirmPassword: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(30, { message: "La contraseña debe tener menos de 30 caracteres" })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,30}$/, { message: "La contraseña debe tener al menos un número, una letra mayúscula, una minúscula y un carácter especial" })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

export const ForgotPasswordPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(passwordSchema)
    })

    const { id, token } = useParams()
    const { status, data, isLoading } = useHttpStore()
    const [isValidating, setIsValidating] = useState(true)
    const { useResetPassword, useValidateResetPasswordPage } = useAuth()

    useEffect(() => {

        const validatePage = async () => {
            setIsValidating(true)
            await useValidateResetPasswordPage(id, token)
            setIsValidating(false)
        }

        validatePage()

    }, [])

    if (isLoading || isValidating) {
        return <Loading />
    }

    const onSubmit = async (formData: RequestResetPasswordData) => {
        await useResetPassword(id, token, formData)
        reset()
    }

    return (

        status === 200 ? (

            <div className="w-full h-full flex flex-col justify-start items-center" >
                <div className="w-5/6 md:w-2/3 lg:w-1/3 h-full flex flex-col justify-center items-center -mt-8">
                    <h1 className="text-3xl font-bold text-neutral-100 text-center mt-4">
                        Restablecer contraseña
                    </h1>
                    <form className="flex flex-col gap-4 p-8 w-full" onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="●●●●●●●●●●"
                            {...register('password')}
                            error={errors.password ? (errors.password.message?.toString()) : ""}
                        />

                        <Input
                            label="Confirmar Contraseña"
                            type="password"
                            placeholder="●●●●●●●●●●"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword ? (errors.confirmPassword.message?.toString()) : ""}
                        />

                        <button
                            type="submit"
                            className="bg-neutral-100 text-neutral-950 rounded-lg p-2 font-bold mt-4"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div >

        ) : (

            <div className="w-full h-full bg-neutral-950 flex justify-center items-center flex-col gap-8">

                <h1 className="text-neutral-100 text-5xl text-center font-bold">{data?.message}</h1>

                <Link

                    to="/auth/login"
                    className="
                    text-neutral-100 text-xl text-center font-semibold border-1 
                    border-neutral-100 rounded-md px-4 py-2 mt-4 hover:bg-neutral-100 
                    hover:text-neutral-950 transition duration-300 ease-in-out
                "
                >
                    Iniciar sesión

                </Link>

            </div>
        )
    )
}