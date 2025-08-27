'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, UserPlus } from 'lucide-react'
import { signup } from '@/Utils/Server'
import EmailVerificationModal from './EmailVerificationModal'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showEmailVerification, setShowEmailVerification] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError('')
    }

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            const result = await signup(
                formData.email, 
                formData.password, 
                formData.name, 
                formData.phone_number
            )
            
            if (result) {
                setShowEmailVerification(true)
            } else {
                setError('Failed to create account. Please try again.')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF9EE] flex items-center justify-center px-4 py-4 lg:mt-22">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#a7c298]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8ba47f]/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#334727]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Signup Card */}
                <div className="bg-[#a7c298] rounded-2xl p-8 shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-white/80">Join our community of developers</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-white font-medium mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                    <div className='flex gap-4 justify-between'>
                        {/* Email Field */}
                        <div className='w-full'>
                            <label className="block text-white font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div className='w-full'>
                            <label className="block text-white font-medium mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 justify-between'>
                        {/* Password Field */}
                        <div className='w-full'>
                            <label className="block text-white font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className='w-full'>
                            <label className="block text-white font-medium mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#334727] hover:bg-[#435f37] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Switch to Login */}
                    <div className="text-center mt-6 pt-6 border-t border-white/20">
                        <p className="text-white/80">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white font-medium hover:underline">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Email Verification Modal */}
            {showEmailVerification && (
                <EmailVerificationModal 
                    email={formData.email}
                    onClose={() => setShowEmailVerification(false)}
                />
            )}
        </div>
    )
}

export default Signup
