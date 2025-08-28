'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Github, Twitter, Linkedin, Mail, Heart, Code, BookOpen, Users } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative mt-10 px-4 py-8">
            {/* Enhanced Glassy Footer */}
            <div className="relative mx-auto w-full max-w-7xl">
                <div className="relative rounded-2xl bg-gradient-to-r from-[#334727]/15 via-[#a7c298]/10 to-[#334727]/15 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#a7c298] to-transparent rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#8ba47f] to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-[#334727] to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    </div>
                    
                    <div className="relative z-10 px-6 py-8">
                        {/* Main Footer Content */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            {/* Brand Section */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Image 
                                            src="/logo/logo.svg" 
                                            alt="Eazydocs Logo" 
                                            width={20} 
                                            height={20} 
                                            style={{ width: '5rem', height: 'auto' }}
                                            priority
                                        />
                                        {/* <div className="absolute -inset-1 bg-gradient-to-r from-[#a7c298] to-[#8ba47f] rounded-full blur opacity-30 animate-pulse"></div> */}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                                    Simplifying documentation for developers worldwide. Learn, create, and share knowledge with our intuitive platform.
                                </p>
                                
                                {/* Social Links with enhanced hover effects */}
                                <div className="flex items-center gap-3">
                                    {[
                                        { icon: Github, href: "https://github.com/iCodeLakshay", label: "GitHub" },
                                        { icon: Twitter, href: "https://x.com/iCodeLakshay", label: "Twitter" },
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/icodelakshay/", label: "LinkedIn" },
                                        { icon: Mail, href: "#", label: "Email" }
                                    ].map(({ icon: Icon, href, label }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="group relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-[#a7c298]/20 hover:to-[#8ba47f]/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                            aria-label={label}
                                        >
                                            <Icon className="w-4 h-4 text-gray-600 group-hover:text-[#334727] transition-colors duration-300" />
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#a7c298] to-[#8ba47f] rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-[#a7c298]" />
                                    Resources
                                </h4>
                                <div className="space-y-2">
                                    {['Documentation', 'Tutorials', 'API Guide', 'Examples'].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            className="block text-sm text-gray-600 hover:text-[#334727] transition-colors duration-200 hover:translate-x-1 transform"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Community Links */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#a7c298]" />
                                    Community
                                </h4>
                                <div className="space-y-2">
                                    {['Contributors', 'Blog', 'Newsletter', 'Support'].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            className="block text-sm text-gray-600 hover:text-[#334727] transition-colors duration-200 hover:translate-x-1 transform"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="px-4 bg-gradient-to-r from-[#a7c298]/10 to-[#8ba47f]/10 rounded-full">
                                    <Code className="w-4 h-4 text-[#a7c298]" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                                <span>for developers</span>
                            </div>
                            
                            <div className="flex items-center gap-6 text-xs text-gray-500">
                                <Link href="#" className="hover:text-[#334727] transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="#" className="hover:text-[#334727] transition-colors">
                                    Terms of Service
                                </Link>
                                <span>© {new Date().getFullYear()} Eazydocs</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none"></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer