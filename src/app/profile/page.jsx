'use client'
import React from 'react'
import TopSection from '@/components/Profile/TopSection'
import MiddleSection from '@/components/Profile/MiddleSection'
import ContentSection from '@/components/Profile/ContentSection'
import ProtectedRoute from '@/Utils/ProtectedRoute'
import { useUser } from '@/Utils/userContext'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    window.location.href = "/login";
    toast.info("Please log in to view your profile.");
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8 mt-18 bricolage-grotesque">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TopSection user={user} />
          <MiddleSection user={user} />
          <ContentSection user={user} />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default ProfilePage