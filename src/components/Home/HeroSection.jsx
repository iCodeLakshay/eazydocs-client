import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='w-[95%] lg:w-[90%] mx-auto bg-[#a7c298] text-white rounded-lg mt-30'>
            <div className='grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 lg:gap-0'>
                {/* Image section - appears first on mobile, left on desktop */}
                <div className='p-4 lg:p-7 flex justify-center lg:justify-start items-center order-2 lg:order-1'>
                    <Image
                        data-aos="fade-right"
                        src="/HomePage/man-with-laptop.png"
                        alt="Man working on laptop"
                        className='filter drop-shadow-xl lg:drop-shadow-2xl drop-shadow-black/60 animation-delay-2000 animate-[bounceLow_2s_infinite] w-full max-w-[300px] md:max-w-[400px] lg:max-w-none'
                        width={500}
                        height={200}
                    />
                </div>

                {/* Text section - appears second on mobile, right on desktop */}
                <div data-aos="fade-left" className='flex items-center p-4 lg:p-4 bricolage-grotesque order-1 lg:order-2'>
                    <div className='mx-auto max-w-3xl flex flex-col gap-3 text-center lg:text-left'>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 line-height-tight'>
                            <span className="rubik-glitch-regular mr-2 lg:mr-4">
                                Stuck
                            </span>
                            <span className="block sm:inline">with messy docs ?</span>
                        </h1>
                        <p className='text-sm sm:text-base lg:text-lg mt-2 text-gray-600 max-w-xl mx-auto lg:mx-0'>
                            Make technical docs easy for everyone—write, share, and simplify knowledge for developers worldwide. Join as a blogger and help the community build better documentation together!
                        </p>
                        <div className='flex flex-col sm:flex-row gap-3 mt-4 lg:mt-2 items-center lg:items-start'>
                            <Link href="/author">
                                <button className='w-full sm:w-auto border border-white text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer'>
                                    Become an Author
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className='w-full sm:w-auto bg-white text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer'>
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
            @keyframes bounceLow {
                0%, 100% {
              transform: translateY(-5%);
                }
            50% {
                transform: translateY(0);
                }
            }
            `}</style>
        </div>
    )
}

export default HeroSection