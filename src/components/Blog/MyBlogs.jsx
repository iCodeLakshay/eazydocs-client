'use client'
import React, { useEffect, useState } from 'react'
import { getBlogsByAuthorId } from '@/Utils/Server'
import { useUser } from '@/Utils/userContext'
import BlogCard from './BlogCard'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"

const MyBlogs = () => {
  const { user } = useUser()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get unique categories from all blogs
  const categories = [...new Set(blogs.flatMap(blog => blog.tags || []))].slice(0, 10)

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || blog.tags?.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user?.id) {
        try {
          setLoading(true)
          const userBlogs = await getBlogsByAuthorId(user.id)
          setBlogs(userBlogs)
        } catch (error) {
          console.error('Error fetching blogs:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchBlogs()
  }, [user?.id])

  if (loading) {
    return (
      <div className="min-h-screen py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#334727] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your blogs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 mt-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 bricolage-grotesque">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Blogs</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and view all your published articles in one place
          </p>
        </div>

        {/* Main Content - Sidebar and Blog Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Search and Filter Section (20% on desktop, full width on mobile) */}
          <div className="w-full lg:w-1/5 lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h3>
              
              {/* Search Bar */}
              <div className="mb-4 border border-gray-200 rounded-md flex items-center px-3">
                <Search className="w-4 h-4 text-gray-400 outline-none flex-shrink-0" />
                <Input
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" bg-transparent w-full text-sm sm:text-md"
                  style={{ outline: 'none' }}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter Blogs</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full rounded-md justify-between bg-white border border-gray-200 hover:border-[#334727]/50 text-sm"
                      endContent={<ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 truncate">
                          {selectedCategory || 'All Categories'}
                        </span>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="Category selection"
                    variant="faded"
                    onAction={(key) => setSelectedCategory(key)}
                    className="w-full max-w-xs"
                    classNames={{
                      base: "bg-white shadow-xl border border-gray-200 rounded-lg",
                      list: "bg-white p-2",
                      item: "hover:bg-gray-100 rounded-md transition-colors duration-200",
                    }}
                  >
                    <DropdownItem 
                      key="" 
                      className="py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      All Categories
                    </DropdownItem>
                    {categories.map((category) => (
                      <DropdownItem 
                        key={category} 
                        className="py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      >
                        {category}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              {/* Stats */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Statistics</h4>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium text-gray-900">{blogs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Published:</span>
                    <span className="font-medium text-green-600">{blogs.filter(blog => blog.isPublished).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Drafts:</span>
                    <span className="font-medium text-orange-600">{blogs.filter(blog => !blog.isPublished).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Showing:</span>
                    <span className="font-medium text-blue-600">{filteredBlogs.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Blog Grid (80% on desktop, full width on mobile) */}
          <div className="flex-1">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery || selectedCategory ? 'No blogs found' : 'No blogs yet'}
                </h3>
                <p className="text-gray-600 mb-6 px-4 text-sm sm:text-base">
                  {searchQuery || selectedCategory 
                    ? 'Try adjusting your search criteria'
                    : 'Start writing your first blog post'
                  }
                </p>
                {!searchQuery && !selectedCategory && (
                  <Button
                    as="a"
                    href="/write"
                    className="bg-[#334727] text-white hover:bg-[#435f37] text-sm sm:text-base"
                  >
                    Create Your First Blog
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard key={blog.id || index} blog={blog} />
                ))}
              </div>
            )}

            {/* Load More / View All */}
            {filteredBlogs.length > 0 && filteredBlogs.length < blogs.length && (
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  variant="bordered"
                  className="border-[#334727] text-[#334727] hover:bg-[#334727] hover:text-white text-sm sm:text-base"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('')
                  }}
                >
                  View All Blogs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBlogs
