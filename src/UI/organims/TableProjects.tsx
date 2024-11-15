'use client'

import { Button, Input } from '@mui/joy';
import React, { useEffect, useState, useCallback } from 'react';
import './styles/table.sass';
import { IProject } from '@/app/core/application/dto/servicesprojects/projects-response.dto';

interface TableProps {
    data: IProject[];
    onEdit: (id: number, data: IProject[]) => void;
    onDelete: (id: number) => void;
}

interface ApiResponse {
    data: IProject[];
    metadata: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
    };
}

export default function TableProjects({ data, onEdit, onDelete }: TableProps) {
    const [filteredData, setFilteredData] = useState<IProject[]>(data);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearch = useCallback(async (query: string) => {
  
        if (!query.trim()) {
            setFilteredData(data);
            return;
        }

        setIsSearching(true);

        const allData: IProject[] = [];
        let currentPage = 1;
        let totalPages = 1;

        try {
            do {
                const response = await fetch(`/api/projects/findAll?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Error en la búsqueda');
                }
                
                const result: ApiResponse = await response.json();
                allData.push(...result.data);
                totalPages = result.metadata.totalPages;
                currentPage += 1;
            } while (currentPage <= totalPages);

            const filteredResults = allData.filter((project) =>
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.description.toLowerCase().includes(query.toLowerCase()) ||
                project.organizer.name.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredData(filteredResults);
        } catch (error) {
            console.error("Error en la búsqueda global:", error);
            alert("Hubo un error al realizar la búsqueda. Por favor, intente de nuevo.");
        } finally {
            setIsSearching(false);
        }
    }, [data]); 


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, handleSearch]); 
    
    return (
        <div className="m-5 bg-white flex flex-col gap-8 rounded-md shadow-lg">
            <div className="px-8 pt-6">
                <h2 className="font-bold text-[1.4em]">Lista de Proyectos</h2>
            </div>

            {/* Parte de búsqueda */}
            <div className="px-8 flex justify-between items-center">
                <div className="relative w-[37%]">
                    <Input
                        placeholder="Buscar Proyectos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isSearching}
                    />
                    {isSearching && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="hidden md:table-header-group">
                        <tr className="border-b-[1px] border-gray-200 text-gray-400">
                            <th className="Th">Titulo</th>
                            <th className="Th">Descripcion</th>
                            <th className="Th">Fecha de Inicio</th>
                            <th className="Th">Fecha de Fin</th>
                            <th className="Th">Estado</th>
                            <th className="Th">Organizador</th>
                            <th className="Th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((project, index) => (
                            <tr
                                key={project.id || index}
                                className="block md:table-row border-b-[1px] border-gray-200 p-4"
                            >
                                <td className="Td" data-label="Titulo">
                                    <span className="Span">Titulo:</span> {project.title}
                                </td>
                                <td className="Td" data-label="Descripcion">
                                    <span className="Span">Descripcion:</span> {project.description}
                                </td>
                                <td className="Td" data-label="Fecha de Inicio">
                                    <span className="Span">Fecha de Inicio:</span> {project.startDate}
                                </td>
                                <td className="Td" data-label="Fecha de Fin">
                                    <span className="Span">Fecha de Fin:</span>{' '}
                                    {project.endDate ? project.endDate : 'Sin fecha'}
                                </td>
                                <td className="Td" data-label="Estado">
                                    <span className="Span">Estado:</span>
                                    <div
                                        className={`${project.isActive ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'
                                            } rounded-xl p-1 text-center`}
                                    >
                                        {project.isActive ? 'Activo' : 'Inactivo'}
                                    </div>
                                </td>
                                <td className="Td" data-label="Organizador">
                                    <span className="Span">Organizador:</span> {project.organizer.name}
                                </td>
                                <td className="Td" data-label="Acciones">
                                    <span className="Span">Acciones:</span>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outlined" 
                                            color="neutral" 
                                            onClick={() => onEdit(project.id, filteredData)}
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="soft" 
                                            color="danger" 
                                            onClick={() => onDelete(project.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mensaje cuando no hay resultados */}
            {filteredData.length === 0 && !isSearching && (
                <div className="text-center py-4 text-gray-500">
                    No se encontraron proyectos que coincidan con la búsqueda
                </div>
            )}
        </div>
    );
}