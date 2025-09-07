'use client'
import React, { useEffect } from 'react'
import TopSection from '@/components/Profile/TopSection'
import MiddleSection from '@/components/Profile/MiddleSection'
import ContentSection from '@/components/Profile/ContentSection'
import ProtectedRoute from '@/Utils/ProtectedRoute'
import { useUser } from '@/Utils/userContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'
import ProfileLoadingSkeleton from '@/components/Profile/ProfileLoadingSkeleton'

const ProfilePage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast("Please log in to view your profile.", {
        icon: <Info />,
      });
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <ProfileLoadingSkeleton />;
  if (!user) return null;

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