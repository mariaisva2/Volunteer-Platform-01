"use client";
import { CustomFieldError, ErrorResponse, ILoginRequest } from "@/app/core";
import { FormField } from "@/UI/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo el obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener  al menos 8  caracteres")
        .required("La contraseña es obligatoria"),
});

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter()
    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        //SERVICE LOGIN
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            console.log(result);

            if (result?.error) {
                console.log("Ocurrio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error))
                return;
            }
            router.push("/dashboard/projects")
            router.refresh()
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = (error: unknown) => {
        const erroData = error as ErrorResponse;
        if (erroData?.errors) {
            if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
                erroData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as CustomFieldError;
                    setError(field as keyof ILoginRequest, { message: error });
                });
            } else if ("message" in erroData.errors[0]) {
                setError("email", { message: erroData.errors[0].message });
            }
        }
    };
    

    return (
        <form
            className="w-full max-w-sm mx-auto p-4 space-y-4"
            onSubmit={handleSubmit(handleLogin)}
        >
            <FormField<ILoginRequest>
                control={control}
                type="email"
                label="Correo Electrónico"
                name="email"
                error={errors.email}
                placeholder="Ingresa tu correo"
            />

            <FormField<ILoginRequest>
                control={control}
                type="password"
                label="Contraseña"
                name="password"
                error={errors.password}
                placeholder="Ingresa tu contraseña"
            />
            <button
                type="submit"
                className="w-full py-2 px-4 bg-black rounded-md text-white font-medium "
            >
                Iniciar Sesión
            </button>
        </form>
    );
};