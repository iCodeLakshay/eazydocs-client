import Image from 'next/image'
import React from 'react'

const CTASection = () => {
    return (
        <div className='w-[90%] mx-auto bg-[#a7c298] text-white rounded-lg mt-30'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>

                                <div className='px-5 pt-15'>
                    <Image data-aos="fade-right" src="/CTA/man-with-laptop.png" alt="Description" width={800} height={300} />
                </div>

                <div data-aos="fade-left" className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum unde voluptatibus omnis itaque quos exercitationem esse soluta vero a, aliquid quidem laudantium iusto? Corrupti!

                </div>


            </div>
        </div>
    )
}

export default CTASection