"use client";

import { IResponsProjects } from "@/app/core/application/dto/servicesprojects/projects-response.dto";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";



interface IProps {
    data: IResponsProjects;
}

function Pagination({ data }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();


    const onPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    // Calcular la página actual dependiendo del tipo de item
    const currentPage = data.metadata.currentPage;
    const totalPages = data.metadata.totalPages

    const buttonStyles = "focus:outline-none transition-colors";
    const disabledButtonStyles = "text-gray-400 hover:text-gray-400 cursor-not-allowed";

    return (
        <div className="flex justify-center items-center mt-5 gap-3">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${buttonStyles} ${currentPage === 1 && disabledButtonStyles}`}
            >
                <IoMdArrowDropleftCircle className='text-[2em]' />
            </button>
            <span>Page</span>
            <span> {currentPage}</span>
            <span>  of  </span>
            <span> {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${buttonStyles} ${currentPage === totalPages && disabledButtonStyles}`}
            >
                <IoMdArrowDroprightCircle className='text-[2em]' />
            </button>
        </div>
    );
}

export default Pagination;