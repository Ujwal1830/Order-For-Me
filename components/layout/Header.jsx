'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { ContactIcon, HomeIcon, LoginIcon, LogoutIcon, MenuIcon, MyOrderIcon } from '@/utils';

export default function Header() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`pt-3 ${isScrolled ? 'sm:rounded-b-full bg-white transition-all duration-500 ease-out' : ''}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <div className={`px-3`}>
        <div className={`${isScrolled ? 'shadow-2xl bg-white' : ''} py-2 px-6 max-w-6xl mx-auto flex items-center justify-between bg-white rounded-full`}>
          <Link href="/" className="flex font-extrabold text-3xl ">
            <h1 className="tracking-tighter font-medium bg-gradient-to-r bg-clip-text from-cyan-900 via-cyan-600 to-cyan-900 inline-block text-transparent">
              OrderForMe
            </h1>
          </Link>
          <nav className="hidden sm:flex items-center gap-1 md:gap-4 [&_>*]:border-b-2 [&_>*]:rounded-full [&_>*]:px-2 md:border-b-0 text-cyan-900 font-semibold">
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            {session?.user?.role == "admin" && (
              <Link className='inline' href={'/adminpanel/users'}>Admin Panel</Link>
            )}
            {session?.user && <Link href={'/menu'}>My Order</Link>}
            <Link href={'/contact'}>Contact</Link>
            {!session ? (
              <Link href={'/login'} className="bg-primaryText px-4 py-2 rounded-3xl text-black/95 hover:bg-white hover:text-black">
                Login
              </Link>
            ) : (
              <button onClick={() => signOut()} className="bg-primaryText block rounded-3xl text-gray-800 hover:bg-gray-200">LogOut</button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
