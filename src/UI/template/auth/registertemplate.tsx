import { RegisterForm } from "@/UI/organims/auth/registerForm";
import { Button } from "@mui/joy";
import Link from "next/link";

export const RegisterTemplate = () => {
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

                    <RegisterForm />

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-blue-500 hover:underline cursor-pointer">
                            ¿Olvidaste tu contraseña?
                        </p>
                        <p className="mt-4">
                            Ya tienes una cuenta?{" "}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Ingresa aca
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};