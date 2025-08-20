import React from 'react'
import Image from 'next/image'
import { cardDetails } from '@/Data/WhatWeProvide.data'

const WhatWeProvide = () => {
  return (
    <div className="py-16 md:py-24 px-4 bg-[#FAF9EE]">
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="bricolage-grotesque text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">What We Provide</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tools and resources designed to simplify technical documentation for developers and teams.
          </p>
        </div>
        
        {/* Cards Container - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
          {cardDetails.map((card, i) => (
            <Card 
              key={i} 
              {...card} 
              data-aos="fade-up" 
              data-aos-delay={100 * (i + 1)} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const Card = ({title, subtitle, image}) => {
  return (
    <div 
      className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-center"
      data-aos="fade-up"
    >
      {/* Background image */}
      <Image 
        src={image} 
        alt={title} 
        fill 
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-center scale-100 group-hover:scale-[1.03] transition-transform duration-500"
      />

      {/* Tinted overlay (inspired by HeroSection palette) */}
      <div className="absolute inset-0 bg-[#334727]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
        <h3 className="text-lg sm:text-3xl font-bold mb-2 drop-shadow-md">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-h-24 sm:max-h-28 overflow-hidden">
          {subtitle}
        </p>
      </div>

      {/* Subtle border ring */}
      <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
    </div>
  )
}

export default WhatWeProvide