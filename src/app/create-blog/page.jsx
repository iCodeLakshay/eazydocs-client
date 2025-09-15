"use client"

import CreateBlogPage from '@/components/Blog/CreateBlogPage';
import ProtectedRoute from '@/Utils/ProtectedRoute';

export default function CreateBlog() {
    return (
        <ProtectedRoute>
            <CreateBlogPage />
        </ProtectedRoute>
    );
}