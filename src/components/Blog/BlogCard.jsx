'use client'
import React from 'react'
import { Card, CardBody } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { Avatar } from "@heroui/avatar"
import { Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/Utils/Server'

const BlogCard = ({ blog, variant = "default" }) => {
    // Extract author info from the populated users field
    const author = blog.users || {}
    const displayTags = blog.tags?.slice(0, 3) || []

    if (variant === "compact") {
        return (
            <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <CardBody className="p-3 sm:p-4">
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
                            <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-600">
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
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return (
        <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 rounded-lg hover:border-[#334727]/20">
            <CardBody className="p-0">
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
                            <span className="text-xs sm:text-sm text-gray-500 self-start sm:self-auto">
                                {formatDate(blog.created_at)}
                            </span>
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
    )
}

export default BlogCard