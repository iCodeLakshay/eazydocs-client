'use client'
import React from 'react'
import MyBlogs from '@/components/Blog/MyBlogs'
import ProtectedRoute from '@/Utils/ProtectedRoute'

const MyBlogsPage = () => {
  return (
    <ProtectedRoute>
      <MyBlogs />
    </ProtectedRoute>
  )
}

export default MyBlogsPage
