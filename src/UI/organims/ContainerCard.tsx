import React, { useEffect, useState } from 'react'
import Card from '../molecules/Card'
import { FaRegFolderOpen } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IProject, IResponsProjects } from '@/app/core/application/dto/servicesprojects/projects-response.dto';
import { IUser } from '@/app/core/application/dto/usersprojects/users-response.dto';


interface cardProps {
    dataP: IResponsProjects
    dataU: IUser[]
}

export default function ContainerCard({ dataP }: cardProps) {
    const [activeProjects, setActiveProjects] = useState<number>(0);
    const [nextProjectDate, setNextProjectDate] = useState<string>("No disponible");
    const [organizersCount, setOrganizersCount] = useState<number>(0);


    useEffect(() => {
        const fetchAllProjects = async () => {
            let allData: IProject[] = [];
            let currentPage = 1;
            let totalPages = 1;

            try {
                while (currentPage <= totalPages) {
                    const response = await fetch(`/api/projects/findAll?page=${currentPage}`);
                    const { data, metadata } = await response.json();

                    allData = [...allData, ...data];
                    totalPages = metadata.totalPages;
                    currentPage++;
                }

                setActiveProjects(allData.filter(project => project.isActive).length);

                const upcomingProject = allData
                    .filter(project => new Date(project.startDate) > new Date())
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

                setNextProjectDate(
                    upcomingProject ? new Date(upcomingProject.startDate).toLocaleDateString() : "No disponible"
                );

                const uniqueOrganizers = new Set(allData.map(project => project.organizer?.id)).size;
                setOrganizersCount(uniqueOrganizers);
            } catch (error) {
                console.error("Error fetching all project data:", error);
            }
        };

        fetchAllProjects();
    }, []);

    return (
        <div className='grid grid-cols-4 m-6 gap-5'>
            <Card data={dataP.metadata.totalItems} title="Total Proyectos" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
            <Card data={activeProjects} title="Proyectos Activos" icon={<GiNetworkBars className="text-[1.4em]" />} />
            <Card data={organizersCount} title="Organizadores" icon={<LuUsers className="text-[1.4em]" />} />
            <Card data={nextProjectDate} title="Proximo Proyecto" icon={<FiCalendar className="text-[1.4em]" />} />
        </div>
    )
}