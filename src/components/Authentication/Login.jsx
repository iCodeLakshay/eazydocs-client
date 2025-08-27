'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn } from 'lucide-react'
import { login } from '@/Utils/Server'
import ForgotPasswordModal from './ForgotPasswordModal'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await login(formData.email, formData.password)
            if (result) {
                // Redirect to dashboard or home
                window.location.href = '/'
            } else {
                setError('Invalid email or password')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
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

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
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
                                onClick={() => setShowForgotPassword(true)}
                                className="text-white/80 hover:text-white transition-colors text-sm underline"
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
