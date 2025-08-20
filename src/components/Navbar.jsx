'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed left-1/2 -translate-x-1/2 top-6 w-[95%] sm:w-[90%] rounded-xl lg:rounded-full bg-[#334727]/10 backdrop-blur-md border border-white/10 shadow-md px-3 sm:px-4 py-3 z-50">
            <div className="flex justify-between items-center">
                {/* Logo/Home */}
                <div className="flex items-center gap-2 ml-8 my-1">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo/logo.svg" alt="Logo" width={28} height={28} className="w-[4rem]" />
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className='hidden md:flex items-center gap-2 lg:gap-4'>
                    <Link href="/" className="text-gray-800 hover:text-white transition-colors text-sm hover:bg-[#334727] border border-[#a8b79e] px-3 lg:px-5 py-2 rounded-full">
                        Home
                    </Link>
                    <Link href="/write" className="text-gray-800 hover:text-white transition-colors text-sm hover:bg-[#334727] border border-[#a8b79e] px-3 lg:px-5 py-2 rounded-full">
                        <span className="hidden lg:inline">Become an author</span>
                        <span className="lg:hidden">Author</span>
                    </Link>
                </div>

                {/* Desktop Search & CTA */}
                <div className="hidden md:flex items-center gap-3 lg:gap-8">
                    <div className='flex items-center border border-gray-300 rounded-full px-3 lg:px-4 py-1.5 lg:py-2'>
                        <input 
                            type="text" 
                            placeholder="what are you looking for..." 
                            className='outline-none border-none focus:ring-0 bg-transparent w-32 lg:w-auto text-sm'
                        />
                        <Search className='text-gray-400 size-4' />
                    </div>
                    <Link href="/register" className="bg-[#334727] hover:bg-[#435f37] text-white transition-all font-medium lg:text-md px-3 lg:px-5 py-1.5 lg:py-2 rounded-full">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden flex items-center text-gray-700"
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
                    <Link href="/register" className="bg-[#334727] hover:bg-[#435f37] text-white text-center py-2 px-4 rounded-full font-medium">
                        Get Started
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar