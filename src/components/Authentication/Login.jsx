'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn } from 'lucide-react'
import { login } from '@/Utils/Server'
import ForgotPasswordModal from './ForgotPasswordModal'
import toast from 'react-hot-toast'

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await login(formData.identifier, formData.password)
            if (result) {
                toast.success('Logged in successfully!')
                window.location.href = '/'
            } else {
                toast.error('Invalid credentials. Please try again.')
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bricolage-grotesque min-h-screen bg-[#FAF9EE] flex items-center justify-center px-4 py-8">
            <div className=" mt-auto relative w-full max-w-md">
                {/* Login Card */}
                <div className="bg-[#a7c298] rounded-2xl p-8 shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/80">Sign in to your account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email/Username Field */}
                        <div>
                            <label className="block text-white font-medium mb-2">Email/Username:</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="identifier"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your email or username"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-white font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#334727] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your password"
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

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button
                                type="button"
                                disabled={true}
                                onClick={() => setShowForgotPassword(true)}
                                className="cursor-not-allowed text-white/80 hover:text-white transition-colors text-sm underline"
                            >
                                Forgot Password?
                            </button>
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
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Switch to Signup */}
                    <div className="text-center mt-6 pt-6 border-t border-white/20">
                        <p className="text-white/80">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-white font-medium hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <ForgotPasswordModal 
                    onClose={() => setShowForgotPassword(false)}
                />
            )}
        </div>
    )
}

export default Login
