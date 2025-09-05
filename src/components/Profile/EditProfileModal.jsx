import React, { useState } from 'react'
import { X, Plus, Trash2, Globe, Github, Twitter, Mail, Linkedin, Instagram } from 'lucide-react'

const EditProfileModal = ({ isOpen, onClose, user, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    tagline: user?.tagline || '',
    biography: user?.biography || '',
    profile_picture: user?.profile_picture || '',
    social_links: user?.social_links || [],
    topics: user?.topics || []
  })

  const [newTopic, setNewTopic] = useState('')
  const [newSocialLink, setNewSocialLink] = useState({ label: '', value: '', href: '', icon: 'Globe' })

  const socialIcons = {
    Globe: Globe,
    Github: Github,
    Twitter: Twitter,
    Mail: Mail,
    Linkedin: Linkedin,
    Instagram: Instagram
  }

  const predefinedTopics = [
    "React", "Node.js", "JavaScript", "Python", "Database", "DevOps", 
    "Web Development", "Mobile Development", "AI/ML", "Cloud Computing",
    "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "Docker", "AWS"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addSocialLink = () => {
    if (newSocialLink.label && newSocialLink.value && newSocialLink.href) {
      setFormData(prev => ({
        ...prev,
        social_links: [...prev.social_links, { ...newSocialLink }]
      }))
      setNewSocialLink({ label: '', value: '', href: '', icon: 'Globe' })
    }
  }

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index)
    }))
  }

  const addTopic = (topic) => {
    if (!formData.topics.includes(topic)) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, topic]
      }))
    }
  }

  const addCustomTopic = () => {
    if (newTopic.trim() && !formData.topics.includes(newTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()]
      }))
      setNewTopic('')
    }
  }

  const handleTopicKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomTopic()
    }
  }

  const removeTopic = (topic) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t !== topic)
    }))
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-5 bg-[#2b3824] rounded-full"></div>
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    disabled={true}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none transition-colors text-gray-500 bg-gray-100 cursor-not-allowed"
                    placeholder="username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none transition-colors"
                  placeholder="A short tagline about yourself"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                <textarea
                  value={formData.biography}
                  onChange={(e) => handleInputChange('biography', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-5 bg-[#2b3824] rounded-full"></div>
              Social Links
            </h3>
            
            {/* Existing Links */}
            <div className="space-y-3 mb-4">
              {formData.social_links.map((link, index) => {
                const IconComponent = socialIcons[link.icon] || Globe
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <IconComponent className="w-5 h-5 text-[#2b3824]" />
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">{link.label}</p>
                      <p className="text-sm text-gray-600">{link.value}</p>
                    </div>
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Add New Link */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <select
                  value={newSocialLink.icon}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, icon: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none"
                >
                  {Object.keys(socialIcons).map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newSocialLink.label}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Label (e.g., GitHub)"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  value={newSocialLink.value}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Display value"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none"
                />
                <input
                  type="url"
                  value={newSocialLink.href}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, href: e.target.value }))}
                  placeholder="URL"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={addSocialLink}
                className="flex items-center gap-2 px-4 py-2 bg-[#2b3824] text-white rounded-lg hover:bg-[#384d2d] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </section>

          {/* Topics */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-5 bg-[#2b3824] rounded-full"></div>
              Topics I Write About
            </h3>
            
            {/* Selected Topics */}
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.topics.map((topic, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#2b3824] text-white text-sm rounded-full"
                >
                  {topic}
                  <button
                    onClick={() => removeTopic(topic)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Available Topics */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {/* Custom Topic Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Topic</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyPress={handleTopicKeyPress}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b3824] focus:border-transparent outline-none transition-colors"
                    placeholder="Enter a custom topic..."
                  />
                  <button
                    onClick={addCustomTopic}
                    disabled={!newTopic.trim()}
                    className="px-4 py-2 bg-[#2b3824] text-white rounded-lg hover:bg-[#384d2d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Predefined Topics */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Click to add these topics:</p>
                <div className="flex flex-wrap gap-2">
                  {predefinedTopics.filter(topic => !formData.topics.includes(topic)).map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => addTopic(topic)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-[#2b3824] hover:text-white transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2b3824]'} text-white rounded-lg hover:bg-[#384d2d] transition-colors font-medium`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal