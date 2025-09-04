'use client'
import React from 'react'
import { Card, CardBody } from "@heroui/card"
import { Badge } from "@heroui/badge"
import { Chip } from "@heroui/chip"
import { Pin, Calendar, Clock, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const ContentSection = ({user}) => {
  // Mock data for recent blogs
  const recentBlogs = [
    {
      id: 1,
      title: "Building Scalable React Applications with Clean Architecture",
      date: "2024-03-15",
      readTime: "8 min read",
      snippet: "Learn how to structure React applications for maintainability and scalability using clean architecture principles...",
      category: "React",
      views: "2.1K"
    },
    {
      id: 2,
      title: "Node.js Performance Optimization: A Complete Guide",
      date: "2024-03-10",
      readTime: "12 min read",
      snippet: "Discover advanced techniques to optimize your Node.js applications for better performance and reliability...",
      category: "Node.js",
      views: "1.8K"
    },
    {
      id: 3,
      title: "Understanding Database Design Patterns for Modern Apps",
      date: "2024-03-05",
      readTime: "15 min read",
      snippet: "Explore essential database design patterns that will help you build robust and efficient applications...",
      category: "Database",
      views: "3.2K"
    }
  ]

  // Mock data for featured post
  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to Modern Web Development",
    date: "2024-02-20",
    readTime: "20 min read",
    snippet: "A comprehensive guide covering everything from frontend frameworks to deployment strategies for modern web applications.",
    category: "Web Development",
    views: "5.4K",
    likes: "240"
  }

  // Categories/Tags
  const categories = [
    "React", "Node.js", "JavaScript", "Python", "Database", "DevOps", 
    "Web Development", "Mobile Development", "AI/ML", "Cloud Computing"
  ]

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
            {recentBlogs.map((blog, index) => (
              <div 
                key={blog.id}
                className="border-l-4 rounded-[8px] border-[#2b3824] pl-4 py-3 hover:bg-gray-50 transition duration-200 rounded-r-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-2">
                      <Chip size="sm" variant="flat" className="bg-[#2b3824]/20 px-3 text-[#2b3824] font-medium">
                        {blog.category}
                      </Chip>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-[#2b3824] transition duration-200 cursor-pointer">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {blog.snippet}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </div>
                      <span>{blog.views} views</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${blog.id}`}>
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
            <Link href="/author/posts">
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
            {categories.map((category, index) => (
              <Chip
                key={index}
                variant="flat"
                className="bg-[#2b3824]/10 text-[#2b3824] hover:bg-[#384d2d] hover:text-white transition duration-200 cursor-pointer font-medium px-2 py-1"
              >
                {category}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default ContentSection
