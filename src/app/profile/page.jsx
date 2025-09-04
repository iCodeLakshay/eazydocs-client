'use client'
import React from 'react'
import TopSection from '@/components/Profile/TopSection'
import MiddleSection from '@/components/Profile/MiddleSection'
import ContentSection from '@/components/Profile/ContentSection'

const ProfilePage = () => {
  return (
    <div className="min-h-screen py-8 mt-18 bricolage-grotesque">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopSection />
        <MiddleSection />
        <ContentSection />
      </div>
    </div>
  )
}

export default ProfilePage