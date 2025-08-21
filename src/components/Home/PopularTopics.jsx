import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { popularTopics } from '@/Data/popularTopics.data'

const PopularTopics = () => {
  return (
    <div className="py-16 md:py-16 px-4 bg-[#FAF9EE]">
      <div className="bricolage-grotesque max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Popular Topics</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most popular documentation categories and learning resources
          </p>
        </div>
        
        {/* Meshed Cards Grid Layout */}
        <div className="grid grid-cols-8 grid-rows-7 gap-4 h-[1000px] md:h-[1200px] overflow-hidden">
          {popularTopics.map((topic) => (
            <TopicCard 
              key={topic.id}
              topic={topic}
              gridPosition={getGridPosition(topic.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to get grid position based on topic ID
const getGridPosition = (id) => {
  switch(id) {
    case 1: return "col-span-2 row-span-2"
    case 2: return "col-span-2 row-span-3 col-start-1 row-start-3"
    case 3: return "col-span-2 row-span-3 col-start-3 row-start-1"
    case 4: return "col-span-2 row-span-2 col-start-3 row-start-4"
    case 5: return "col-span-4 row-span-2 col-start-5 row-start-1"
    case 6: return "col-span-2 row-span-3 col-start-5 row-start-3"
    case 7: return "col-span-2 row-span-3 col-start-7 row-start-3"
    case 8: return "col-span-4 row-span-2 col-start-3 row-start-6"
    case 9: return "col-span-2 row-span-2 col-start-1 row-start-6"
    case 10: return "col-span-2 row-span-2 col-start-7 row-start-6"
    default: return ""
  }
}

const TopicCard = ({ topic, gridPosition }) => {
  return (
    <Link 
      href={topic.link}
      className={`${gridPosition} group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
      data-aos="fade-up"
      data-aos-delay={(topic.id % 5) * 100}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/20 transition-colors duration-300 z-10"></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent z-10"></div>
      
      {/* Image */}
      <Image 
        src={topic.image || "/placeholder/placeholder.svg"} 
        alt={topic.title} 
        fill 
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-white text-lg font-bold mb-1 group-hover:text-white/90">{topic.title}</h3>
        <p className="text-white/80 text-sm hidden md:block">{topic.subtitle}</p>
      </div>
      
      {/* Card border effect */}
      <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none z-20"></div>
    </Link>
  )
}

export default PopularTopics