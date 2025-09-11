'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardBody } from "@heroui/card"
import { Badge } from "@heroui/badge"
import { Chip } from "@heroui/chip"
import { Pin, Calendar, Clock, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { formatDateTime, getBlogsByAuthorId } from '@/Utils/Server'

const ContentSection = ({user}) => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getBlogsByAuthorId(user.id).then((blogs) => {
        setRecentBlogs(Array.isArray(blogs) ? blogs : []);
      });
    }
  }, [user?.id]);

  return (
    <div className="w-full space-y-8 mt-8">
      {/* Recent Blogs */}
      <Card className="shadow-lg border-0 bg-white rounded-2xl" data-aos="fade-up" data-aos-delay="100">
        <CardBody className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-[#2b3824] rounded-full"></div>
            Recent Blogs
          </h2>
          
          <div className="space-y-4">
            {recentBlogs.slice(0, 4).map((blog, index) => (
              <div 
                key={index}
                className="border-l-4 rounded-[8px] border-[#2b3824] pl-4 py-3 hover:bg-gray-50 transition duration-200 rounded-r-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-2">
                      {Array.isArray(blog.tags) && blog.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          variant="flat"
                          className="bg-[#2b3824]/20 px-3 text-[#2b3824] font-medium"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 hover:text-[#2b3824] transition duration-200 cursor-pointer">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {blog.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDateTime(blog.created_at)}</span>
                      </div>
                      {/* <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.read_time}</span>
                      </div> */}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${blog.slug}`} className='mr-5'>
                    <button className="flex items-center gap-1 px-3 py-1 text-[#2b3824] hover:bg-[#384d2d] hover:text-white font-medium rounded-lg transition duration-200 text-sm whitespace-nowrap">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Posts Link */}
          <div className="mt-6 text-center">
            <Link href={`/author/posts/${user.id}`}>
              <button className="px-6 py-2 border-2 border-[#2b3824] text-[#2b3824] font-medium rounded-lg hover:bg-[#384d2d] hover:text-white transition duration-200">
                View All Posts
              </button>
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Categories/Tags Section */}
      <Card className="shadow-lg border-0 bg-white rounded-2xl" data-aos="fade-up" data-aos-delay="200">
        <CardBody className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-[#2b3824] rounded-full"></div>
            Topics I Write About
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {user.topics.map((topic, index) => (
              <Chip
                key={index}
                variant="flat"
                className="bg-[#2b3824]/10 text-[#2b3824] hover:bg-[#384d2d] hover:text-white transition duration-200 cursor-pointer font-medium px-2 py-1"
              >
                {topic}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default ContentSection
