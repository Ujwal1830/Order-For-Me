'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Users from './users/page';
import Products from './products/page';
import { redirect, usePathname, useRouter } from "next/navigation";

export default function AdminPanelLayout({children}) {
    const pathname = usePathname();
    const router = useRouter();
    console.log(pathname)
    
    const [option, setOption] = useState("");
    const handleTabChange=(tab)=>{
        setOption(tab); 
    }

      return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center'>
                <div className="inline-flex rounded-md shadow-sm">
                    <Link
                        href="/adminpanel/users"
                        onClick={() => handleTabChange('users')}
                        className={`${pathname.includes("/adminpanel/users") ? "bg-gray-300 text-black/80" : "bg-black/80 text-white/90" } flex flex-row items-center gap-2 px-2 py-2 text-sm font-medium rounded-s-lg`}
                    >
                        <svg className={`${pathname.includes("/adminpanel/users") ? " text-black/90" : "text-white/90" } w-4 h-6`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
                        </svg>
                        <span>Users</span>
                    </Link>
                    <Link
                        href="/adminpanel/products"
                        onClick={() => handleTabChange('products')}
                        className={`${pathname.includes("/adminpanel/products") ? "bg-gray-300 text-black/80" : "bg-black/80 text-white/90" } flex flex-row items-center gap-2 px-2 py-2 text-sm font-medium `}
                    >
                        <svg className={`${pathname.includes("/adminpanel/products") ? " text-black/90" : "text-white/90" } w-4 h-6`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z"/>
                        </svg>
                        <span>Products</span>
                    </Link>
                    <Link
                        href="/adminpanel/create"
                        onClick={() => handleTabChange('create')}
                        className={`${pathname.includes("/adminpanel/create") ? "bg-gray-300 text-black/80" : "bg-black/80 text-white/90" } flex flex-row items-center gap-2 px-2 py-2 text-sm font-medium rounded-e-lg`}
                    >
                        <svg className={`${pathname.includes("/adminpanel/create") ? " text-black/90" : "text-white/90" } w-4 h-6`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z"/>
                        </svg>
                        <span>Create</span>
                    </Link>
                </div>
            </div>
          {children}
        </div>
    );
}