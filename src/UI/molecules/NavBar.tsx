'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@mui/joy";
import { FaRegFileZipper } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";

interface NavBarProps {
    onAdd: () => void;
}

export default function NavBar({ onAdd }: NavBarProps) {
    const { data: session } = useSession();

    if (!session) {
        return <div>No has iniciado sesión</div>;
    }

    const user = session.user;

    const handleDownloadReport = async () => {
        const token = session?.user?.token;
        try {
            const response = await fetch("/api/projects/report/download", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error downloading report");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "reporte_proyectos.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Error downloading report:", error);
        }
    };

    return (
        <div className="w-full flex justify-between items-center p-3 bg-white">
            <div className="flex">
                <h2 className="font-bold text-[1.8em]">Dashboard de Proyectos</h2>
            </div>
            <div className="flex gap-4 items-center">
                <Button
                    sx={{
                        bgcolor: "black",
                        display: "flex",
                        gap: "8px",
                        "&:hover": { backgroundColor: "black" },
                    }}
                    onClick={handleDownloadReport}
                >
                    <FaRegFileZipper className="text-[1.2em]" />
                    Descargar Reporte
                </Button>
                <Button
                    sx={{
                        bgcolor: "black",
                        display: "flex",
                        gap: "8px",
                        "&:hover": { backgroundColor: "black" },
                    }}
                    onClick={onAdd}
                >
                    <GoPlusCircle className="text-[1.2em]" />
                    Nuevo Proyecto
                </Button>
                {user?.photo ? (
                    <Image
                        src={user.photo}
                        alt="Foto de perfil"
                        width={80}
                        height={80}
                        quality={100}
                        className="rounded-full w-9 h-9"
                    />
                ) : (
                    <p>No se ha cargado la foto de perfil</p>
                )}
                <h1>{user?.name}</h1>
            </div>
        </div>
    );
}