'use client'
import React, { useState } from 'react'
import { Avatar } from "@heroui/avatar"
import EditProfileModal from './EditProfileModal'
import { updateUserProfile } from '@/Utils/Server'
import toast from 'react-hot-toast'
import { useUser } from '@/Utils/userContext'

const TopSection = ({user}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async (updatedData) => {
    setLoading(true);
    const response = await updateUserProfile(user.id, updatedData);
    console.log("Update Response:", response);
    
    if(response){
      setUser(response.user);
      toast.success('Profile updated successfully');
      setIsEditModalOpen(false);
    } else {
      toast.error('Failed to update profile');
    }
    setLoading(false);
  }

  return (
    <>
      <div className="w-full bg-[#a7c298] rounded-lg shadow-xl">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0" data-aos="fade-right">
              <div className="relative">
                <Avatar
                  src={user?.profile_picture || "/placeholder/profile.jpg"}
                  alt="Profile Picture"
                  className="w-32 h-32 md:w-40 md:h-40 text-large border-4 border-white shadow-xl"
                />
                {/* Online indicator (optional) */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow text-center md:text-left" data-aos="fade-left">
              <div className="space-y-3">
                {/* Name */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  {user ? user.name : 'John Doe'}
                </h1>
                
                {/* Username */}
                <p className="text-lg md:text-xl text-gray-700 font-medium">
                  {user ? `@${user.username}` : '@johndoe_dev'}
                </p>
                
                {/* Bio/Tagline */}
                <div className="mt-4">
                  <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                    {user ? user.tagline : 'Add your tagline here'}
                  </p>
                  <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto md:mx-0 mt-2">
                    {user ? user.biography : 'Add your bio here...'}
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-6 py-2 cursor-pointer bg-white text-[#2b3824] font-bold rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-50"
                  >
                    Edit Profile
                  </button>
                  <button className="px-6 py-2 cursor-pointer border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#2b3824] transition duration-200">
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
        loading={loading}
      />
    </>
  )
}

export default TopSection
