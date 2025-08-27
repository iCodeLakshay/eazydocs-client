'use client'
import React, { useState } from 'react'
import { X, Mail, Send } from 'lucide-react'
import OTPModal from './OTPModal'

const ForgotPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showOTP, setShowOTP] = useState(false)

    const handleSendOTP = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // TODO: Implement forgot password API call
            // const result = await sendForgotPasswordOTP(email)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            setShowOTP(true)
        } catch (err) {
            setError('Failed to send OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (showOTP) {
        return (
            <OTPModal 
                email={email}
                type="forgot-password"
                onClose={onClose}
                onBack={() => setShowOTP(false)}
            />
        )
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#a7c298]/20 rounded-full mb-4">
                        <Mail className="w-8 h-8 text-[#a7c298]" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                    <p className="text-gray-600">Enter your email to receive an OTP</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSendOTP} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#a7c298] focus:border-transparent outline-none transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#a7c298] hover:bg-[#8ba47f] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Sending OTP...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Send OTP
                            </>
                        )}
                    </button>
                </form>

                {/* Back to Login */}
                <div className="text-center mt-4">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-[#334727] transition-colors text-sm"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordModal
