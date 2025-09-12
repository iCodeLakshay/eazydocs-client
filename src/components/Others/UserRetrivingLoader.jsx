'use client'
import React from 'react'
import { CircleUser } from 'lucide-react'

const UserRetrivingLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center max-w-sm w-full">
        <div className="relative">
          <CircleUser className="w-12 h-12 sm:w-16 sm:h-16 text-[#334727] opacity-20" />
        </div>
        
        <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-800 text-center">Retrieving User</h3>
        <p className="mt-2 text-gray-600 text-center text-sm sm:text-base leading-relaxed">
          Please wait while we verify your credentials...
        </p>
        
        {/* Simple loading dots */}
        <div className="mt-4 sm:mt-6 flex space-x-1">
          <div className="w-2 h-2 bg-[#334727] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#334727] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-[#334727] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default UserRetrivingLoader
