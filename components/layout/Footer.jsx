'use client'
import { useState } from 'react';
import Link from 'next/link';
import {signOut} from "next-auth/react";
import { useSession } from 'next-auth/react';
import { AdminPanelIcon, ContactIcon, HomeIcon, LoginIcon, LogoutIcon, MenuIcon, MyOrderIcon } from '@/utils';


export default function Footer() {

    const {data: session, status} = useSession();

  return (
        <div className="fixed bottom-3 left-3 right-3  visible sm:hidden">
            <div className="transition-all duration-500 ease-out py-2 flex flex-row text-center items-center justify-around bg-white  rounded-full">
                <Link href={'/'} className="block text-gray-800 rounded-full">
                    <HomeIcon />
                </Link>
                <Link href={'/menu'} className="block  text-gray-800 ">
                    <MenuIcon />
                </Link>
                {session?.user?.role=="admin" && (
                    <Link href={'/adminpanel/users'} className="block  text-gray-800 ">
                        <AdminPanelIcon />
                    </Link>
                )}
                { session && <Link  href={'/menu'} className="block  text-gray-800 ">
                    <MyOrderIcon />
                    </Link>}
                { !session && <Link href={'/contact'} className="block  text-gray-800 ">
                    <ContactIcon />
                </Link>}
                { !session ? (
                    <Link href={'/login'} className="block  text-gray-800 ">
                    <LoginIcon />
                    </Link>
                ) : (
                    <Link href={'/'} onClick={()=> signOut()} className="block  text-gray-800">
                        <LogoutIcon />
                    </Link>
                )}
            </div>
        </div>
    )
}
