'use client'
import React, { useState } from 'react'
import { Card, CardBody } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { Avatar } from "@heroui/avatar"
import { Clock, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { formatDate, deleteBlogById } from '@/Utils/Server'
import DeleteConfirmModal from '../Others/DeleteConfirmModal'
import ApprovalStatus from '../Others/ApprovalStatus'

const BlogCard = ({ blog, variant = "default", onDelete }) => {
    // Extract author info from the populated users field
    const author = blog.users || {}
    const displayTags = blog.tags?.slice(0, 3) || []
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        try {
            setIsDeleting(true)
            const result = await deleteBlogById(blog.id, blog.author)
            if (result) {
                // Call the onDelete callback to refresh the blog list
                if (onDelete) {
                    onDelete(blog.id)
                }
                setIsDeleteModalOpen(false)
            } else {
                alert('Failed to delete blog. Please try again.')
            }
        } catch (error) {
            console.error('Error deleting blog:', error)
            alert('Error deleting blog. Please try again.')
        } finally {
            setIsDeleting(false)
        }
    }

    if (variant === "compact") {
        return (
            <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-100 relative group">
                <CardBody className="p-3 sm:p-4">
                    {/* Delete Button */}
                    <button
                        onClick={handleDeleteClick}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-10"
                        title="Delete blog"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>

                    <div className="flex gap-3 sm:gap-4">
                        {/* Banner Image */}
                        <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                            <img
                                src={blog.banner_image || '/placeholder/placeholder.svg'}
                                alt={blog.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                                {displayTags.map((tag, idx) => (
                                    <Chip
                                        key={idx}
                                        size="sm"
                                        variant="flat"
                                        className="bg-[#334727]/10 text-[#334727] text-xs"
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </div>

                            {/* Title */}
                            <Link href={`/blog/${blog.slug}`}>
                                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2 hover:text-[#334727] transition-colors cursor-pointer">
                                    {blog.title}
                                </h3>
                            </Link>

                            {/* Author and Date */}
                            <div className="flex items-center justify-between gap-1 sm:gap-2 text-xs text-gray-600">
                                <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                                    <Avatar
                                        src={author.profile_picture || '/placeholder/profile.jpg'}
                                        alt={author.name}
                                        size="sm"
                                        className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                                    />
                                    <span className="truncate">{author.name}</span>
                                    <span className="flex-shrink-0">•</span>
                                    <span className="flex-shrink-0">{formatDate(blog.created_at)}</span>
                                </div>
                                <ApprovalStatus 
                                    approved={blog.approved} 
                                    isPublished={blog.isPublished}
                                    size="small"
                                    showText={false}
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return (
        <>
        <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 rounded-lg hover:border-[#334727]/20 relative group">
            <CardBody className="p-0">
                {/* Delete Button */}
                <button
                    onClick={handleDeleteClick}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-10 shadow-lg"
                    title="Delete blog"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

                {/* Banner Image */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                        src={blog.banner_image || '/placeholder/placeholder.svg'}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {/* Author Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                        <div className='flex items-center gap-2'>
                        <Avatar
                            src={author.profile_picture || '/placeholder/profile.jpg'}
                            alt={author.name}
                            size="sm"
                            className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
                        />
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 min-w-0">
                            <span className="font-medium text-gray-900 truncate">{author.name}</span>
                            <span className="flex-shrink-0">•</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Clock className="w-3 h-3" />
                                <span>5 min read</span>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ApprovalStatus 
                                approved={blog.approved} 
                                isPublished={blog.isPublished}
                                size="small"
                                showText={false}
                            />
                            <span className="text-xs sm:text-sm text-gray-500 self-start sm:self-auto">
                                {formatDate(blog.created_at)}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${blog.slug}`}>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 hover:text-[#334727] transition-colors cursor-pointer leading-tight">
                            {blog.title}
                        </h2>
                    </Link>

                    {/* Subtitle */}
                    {blog.subtitle && (
                        <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                            {blog.subtitle}
                        </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                        {displayTags.map((tag, idx) => (
                            <Chip
                                key={idx}
                                size="sm"
                                variant="flat"
                                className="bg-[#334727]/10 text-[#334727] px-2 sm:px-3 py-1 text-xs"
                            >
                                {tag}
                            </Chip>
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
        
        <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            blogTitle={blog.title}
            loading={isDeleting}
        />
        </> 
    )
}

export default BlogCard