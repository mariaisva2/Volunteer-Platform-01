import { LoginForm } from "@/UI/organims";
import { Button } from "@mui/joy";
import Link from "next/link";

export const LoginTemplate = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white flex flex-col">
            {/* Header */}
            <header className="p-4">
                <Link href="/" >
                    <Button
                        variant="plain"
                        sx={{ fontSize: "1.2em" }}
                    >
                        Volver al inicio
                    </Button></Link>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Ingresa tus credenciales para ingresar a tu cuenta
                    </p>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-blue-500 hover:underline cursor-pointer">
                            ¿Olvidaste tu contraseña?
                        </p>
                        <p className="mt-4">
                            ¿No tienes una cuenta?{" "}
                            <Link href="/register" className="text-blue-500 hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};