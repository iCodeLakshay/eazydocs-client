'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Search, Menu, X } from 'lucide-react';
import { useUser } from '@/Utils/userContext'
import { ProfileDropdownMenu } from './Others/ProfileDropdownMenu';

import { createPortal } from 'react-dom';
import { LogoutModal } from './Others/LogoutModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading } = useUser();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    return (
        <>
            <nav className="fixed left-1/2 -translate-x-1/2 top-4 w-[95%] sm:w-[90%] rounded-xl lg:rounded-full bg-[#334727]/10 backdrop-blur-md border border-white/10 shadow-md px-3 sm:px-4 py-3 z-50">
                <div className="flex justify-between items-center w-[98%] mx-auto relative">
                    {/* Profile (left on mobile, right on desktop) */}
                    <div className="md:hidden order-1 md:order-3 flex items-center ml-0 md:ml-auto mr-2">
                        <ProfileDropdownMenu setModalOpen={setIsLogoutModalOpen}>
                            <button className="w-fit border-4 border-[#a8b79e] bg-[#334727] hover:bg-[#435f37] rounded-full ">
                                <Image src="/placeholder/profile.jpg" alt="Logo" width={30} height={30} className=" rounded-full" />
                            </button>
                        </ProfileDropdownMenu>
                    </div>

                    {/* Logo (center on mobile, left on desktop) */}
                    <div className="order-2 md:order-1 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2 my-1">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo/logo.svg" alt="Logo" width={28} height={28} className="w-[4rem]" priority />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className='hidden md:flex items-center gap-2 lg:gap-4 order-2'>
                        <Link href="/" className="text-gray-800 hover:text-white transition-colors text-sm hover:bg-[#334727] border border-[#a8b79e] px-3 lg:px-5 py-2 rounded-full">
                            Home
                        </Link>
                        <Link href="/write" className="text-gray-800 hover:text-white transition-colors text-sm hover:bg-[#334727] border border-[#a8b79e] px-3 lg:px-5 py-2 rounded-full">
                            <span className="hidden lg:inline">Become an author</span>
                            <span className="lg:hidden">Author</span>
                        </Link>
                    </div>

                    {/* Desktop Search & CTA */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-4 order-3">
                        <div className='flex items-center border border-gray-300 rounded-full px-3 lg:px-4 py-1.5 lg:py-2'>
                            <input
                                type="text"
                                placeholder="what are you looking for..."
                                className='outline-none border-none focus:ring-0 bg-transparent w-32 lg:w-45 text-sm p-1'
                            />
                            <Search className='text-gray-400 size-4' />
                        </div>

                        {/* Login/Signup button or User Profile section */}
                        {!loading && (
                            user ? (
                                <ProfileDropdownMenu setModalOpen={setIsLogoutModalOpen}>
                                    <button className="w-fit border-4 border-[#a8b79e] bg-[#334727] hover:bg-[#435f37] rounded-full ">
                                        <Image src="/placeholder/profile.jpg" alt="Logo" width={40} height={40} className=" rounded-full" />
                                    </button>
                                </ProfileDropdownMenu>
                            ) : (
                                <Link href="/login" className="bg-[#334727] hover:bg-[#435f37] text-white transition-all font-medium lg:text-md px-3 lg:px-5 py-1.5 lg:py-2 rounded-full">
                                    Log In/Sign Up
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex items-center text-gray-700 order-4 ml-2"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col text-center mt-4 pb-3 gap-3 border-t border-gray-200/50 pt-3">
                        <div className='flex justify-around gap-4'>

                            <Link href="/" className="w-full text-gray-800 hover:text-white hover:bg-[#334727] py-2 px-3 rounded-lg font-medium text-sm border border-gray-300">
                                Home
                            </Link>
                            <Link href="/write" className="w-full text-gray-800 hover:text-white hover:bg-[#334727] py-2 px-3 rounded-lg font-medium text-sm border border-gray-300">
                                Become an author
                            </Link>
                        </div>
                        <div className='flex items-center border border-gray-300 rounded-full px-3 py-1.5 mb-2'>
                            <input
                                type="text"
                                placeholder="what are you looking for..."
                                className='outline-none border-none focus:ring-0 bg-transparent w-full text-sm'
                            />
                            <Search className='text-gray-400 size-4 flex-shrink-0' />
                        </div>
                    </div>
                )}
            </nav>

            {/* Modal rendered outside nav using portal */}
            {isLogoutModalOpen && typeof document !== 'undefined' && createPortal(
                <LogoutModal 
                    isOpen={isLogoutModalOpen} 
                    onClose={() => setIsLogoutModalOpen(false)} 
                />,
                document.body
            )}
        </>
    )
}



export default Navbar