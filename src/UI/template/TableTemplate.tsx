'use client'

import React, { useState } from 'react';
import TableProjects from '../organims/TableProjects';
import ContainerCard from '../organims/ContainerCard';
import NavBarClient from '../molecules/NavBar';
import { ProjectsService } from '@/app/infractrusture/services/projects.service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IPostProject } from '@/app/core/application/dto/servicesprojects/projects-request.dto';
import { IResponsProjects } from '@/app/core/application/dto/servicesprojects/projects-response.dto';
import { IResponseUser } from '@/app/core/application/dto/usersprojects/users-response.dto';
import Pagination from '../molecules/pagination';
import { ProjectModal } from '../molecules/formproject';

interface dataProps {
    dataP: IResponsProjects;
    dataU: IResponseUser,
}

export default function TableTemplate({ dataP, dataU }: dataProps) {
    const [selectedProject, setSelectedProject] = useState<IPostProject | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const useProjectsService = new ProjectsService();

    const handleOpenModal = (id?: number) => {
        if (id) {
            const project = dataP.data.find((item) => item.id === id);
            if (project) {
                const projectData: IPostProject = {
                    title: project.title,
                    description: project.description,
                    startDate: project.startDate,
                    endDate: project.endDate,
                };
                setSelectedProject(projectData);
                setSelectedProjectId(id); 
            }
        } else {
            setSelectedProject(null);
            setSelectedProjectId(null); 
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setSelectedProjectId(null); 
    };

    const handleSubmit = async (formData: IPostProject) => {
        try {
            if (selectedProjectId) {
                
                await useProjectsService.save(formData, selectedProjectId);
                console.log("Project updated successfully");
                toast.success("The project was updated")
                router.refresh()
            } else {
                
                await useProjectsService.create(formData);
                console.log("Project created successfully");
                toast.success("The project was created")
                router.refresh()
            }
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error("Error saving project")
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await useProjectsService.destroy(id);
            console.log("Project deleted successfully");
            toast.success("The project was deleted")
            router.refresh() 
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Error deleting project")
        }
    };

    return (
        <div className='mb-4'>
            <NavBarClient onAdd={() => handleOpenModal()} />
            <ContainerCard dataP={dataP} dataU={dataU.data} />
            <TableProjects
                data={dataP.data}
                onEdit={(id) => handleOpenModal(id)} 
                onDelete={handleDelete} 
            />
            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit} 
                initialData={selectedProject}
            />
            <Pagination data={dataP} />
        </div>
    );
}