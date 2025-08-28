import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { popularTopics } from '@/Data/popularTopics.data'

const PopularTopics = () => {
  return (
    <div className="py-16 md:py-16 px-4 bg-[#FAF9EE]">
      <div className="bricolage-grotesque max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">Popular Topics</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore our most popular documentation categories and learning resources
          </p>
        </div>
        
        {/* Meshed Cards Grid Layout */}
        <div className="grid gap-4 overflow-hidden
                        grid-cols-2 auto-rows-[200px] sm:auto-rows-[220px]
                        md:grid-cols-4 md:auto-rows-[180px] md:h-[600px]
                        lg:grid-cols-6 lg:auto-rows-[160px] lg:h-[800px]
                        xl:grid-cols-8 xl:grid-rows-7 xl:h-[1000px] xl:auto-rows-auto">
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
    case 1: return "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2"
    case 2: return "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-3 xl:col-span-2 xl:row-span-3 xl:col-start-1 xl:row-start-3"
    case 3: return "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-1 xl:col-span-2 xl:row-span-3 xl:col-start-3 xl:row-start-1"
    case 4: return "col-span-2 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-4 xl:col-span-2 xl:row-span-2 xl:col-start-3 xl:row-start-4"
    case 5: return "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-6 xl:col-span-4 xl:row-span-2 xl:col-start-5 xl:row-start-1"
    case 6: return "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-3 lg:col-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-1 xl:col-span-2 xl:row-span-3 xl:col-start-5 xl:row-start-3"
    case 7: return "col-span-1 row-span-2 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-3 lg:col-start-3 lg:row-start-4 xl:col-span-2 xl:row-span-3 xl:col-start-7 xl:row-start-3"
    case 8: return "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-4 md:row-span-1 lg:col-span-4 lg:row-span-2 lg:col-start-1 lg:row-start-4 xl:col-span-4 xl:row-span-2 xl:col-start-3 xl:row-start-6"
    case 9: return "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-4 xl:col-span-2 xl:row-span-2 xl:col-start-1 xl:row-start-6"
    case 10: return "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-6 xl:col-span-2 xl:row-span-2 xl:col-start-7 xl:row-start-6"
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
        width={400}
        height={300}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        style={{ width: '100%', height: 'auto' }}
      />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 z-20">
        <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1 group-hover:text-white/90 leading-tight">{topic.title}</h3>
        <p className="text-white/80 text-xs sm:text-sm hidden sm:block md:block">{topic.subtitle}</p>
      </div>
      
      {/* Card border effect */}
      <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none z-20"></div>
    </Link>
  )
}

export default PopularTopics