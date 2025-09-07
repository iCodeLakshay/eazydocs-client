import React from 'react'

const ProfileLoadingSkeleton = () => {
  return (
    <div className="min-h-screen py-8 mt-18 bricolage-grotesque">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Skeleton */}
        <div className="w-full bg-gray-100 rounded-lg shadow-xl animate-pulse">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Profile Picture Skeleton */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 rounded-full"></div>
              </div>

              {/* Profile Info Skeleton */}
              <div className="flex-grow text-center md:text-left">
                <div className="space-y-3">
                  {/* Name Skeleton */}
                  <div className="h-8 md:h-10 bg-gray-300 rounded w-48 mx-auto md:mx-0"></div>
                  
                  {/* Username Skeleton */}
                  <div className="h-6 bg-gray-300 rounded w-32 mx-auto md:mx-0"></div>
                  
                  {/* Bio Skeleton */}
                  <div className="mt-4 space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto md:mx-0"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto md:mx-0"></div>
                  </div>

                  {/* Buttons Skeleton */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                    <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
                    <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section Skeleton */}
        <div className="mt-8 bg-white rounded-lg shadow-lg animate-pulse">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center p-4">
                  <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b pb-4 last:border-b-0">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Topics */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="h-6 bg-gray-200 rounded-full w-16"></div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-28 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLoadingSkeleton