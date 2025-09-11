'use client'
import React from 'react'
import { Card, CardBody } from "@heroui/card"
import { Mail, Globe, Github, Twitter, Calendar, FileText, Users, TrendingUp } from 'lucide-react'
import { formatDate, formatDateTime } from '@/Utils/Server'

const MiddleSection = ({user}) => {
  // const contactLinks = [
  //   { icon: Mail, label: 'Email', value: 'john@example.com', href: 'mailto:john@example.com' },
  //   { icon: Globe, label: 'Website', value: 'johndoe.dev', href: 'https://johndoe.dev' },
  //   { icon: Github, label: 'GitHub', value: 'johndoe', href: 'https://github.com/johndoe' },
  //   { icon: Twitter, label: 'Twitter', value: '@johndoe_dev', href: 'https://twitter.com/johndoe_dev' }
  // ]
  console.log("User in MiddleSection:", user);
  
  const stats = [
    { icon: FileText, label: 'Total Posts', value: user.blogs.length },
    { icon: Users, label: 'Followers', value: user.followers || '1.2K' },
    { icon: TrendingUp, label: 'Views', value: user.views || '25.6K' },
    { icon: Calendar, label: 'Joined', value: formatDate(user.created_at) || 'Jan 2025' }
  ]

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Contact Links Section */}
      <Card className="shadow-lg border-0 bg-white rounded-2xl" data-aos="fade-up">
        <CardBody className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-[#2b3824] rounded-full"></div>
            Contact & Links
          </h2>
          <div className="space-y-4">
            {!user?.social_links || user.social_links.length === 0 ? (
              // Default contact links when no social links are set
              contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition duration-200 group"
                >
                  <div className="w-10 h-10 bg-[#2b3824]/20 rounded-full flex items-center justify-center group-hover:bg-[#2b3824] transition duration-200">
                    <link.icon className="w-5 h-5 text-[#2b3824] group-hover:text-white transition duration-200" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">{link.label}</p>
                    <p className="font-medium text-gray-900">{link.value}</p>
                  </div>
                </a>
              ))
            ) : (
              // User's custom social links
              user.social_links.map((link, index) => {
                const IconComponent = link.icon === 'Mail' ? Mail : 
                                    link.icon === 'Github' ? Github :
                                    link.icon === 'Twitter' ? Twitter :
                                    link.icon === 'Linkedin' ? Github : // You can add Linkedin icon if needed
                                    link.icon === 'Instagram' ? Github : // You can add Instagram icon if needed
                                    Globe;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition duration-200 group"
                  >
                    <div className="w-10 h-10 bg-[#2b3824]/20 rounded-full flex items-center justify-center group-hover:bg-[#2b3824] transition duration-200">
                      <IconComponent className="w-5 h-5 text-[#2b3824] group-hover:text-white transition duration-200" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-gray-600">{link.label}</p>
                      <p className="font-medium text-gray-900">{link.value}</p>
                    </div>
                  </a>
                )
              })
            )}
          </div>
        </CardBody>
      </Card>

      {/* Stats Section */}
      <Card className="shadow-lg border-0 bg-white rounded-2xl" data-aos="fade-up" data-aos-delay="200">
        <CardBody className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-[#2b3824] rounded-full"></div>
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-[#2b3824]/10 transition duration-200 border border-gray-100"
              >
                <div className="w-10 h-10 bg-[#2b3824]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-[#2b3824]" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default MiddleSection
