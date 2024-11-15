
import React from 'react'
import AuthGuard from './guard/AuthGuard'
import Sidebar from '@/UI/molecules/SideBar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PrivateLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
            <AuthGuard>
                <div className="w-full flex">
                    <div className='w-[20%]'>
                        <Sidebar />
                    </div>
                    <div className='w-[80%]'> 
                        {children}
                    </div>
                </div>
            </AuthGuard>
            <ToastContainer />
        </div>

    )
}