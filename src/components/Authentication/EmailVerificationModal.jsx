'use client'
import React, { useState } from 'react'
import { X, Mail, Send, CheckCircle } from 'lucide-react'
import OTPModal from './OTPModal'

const EmailVerificationModal = ({ email, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [otpSent, setOtpSent] = useState(false)

    const handleSendOTP = async () => {
        setLoading(true)
        setError('')

        try {
            // TODO: Implement email verification OTP API call
            // const result = await sendEmailVerificationOTP(email)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            setOtpSent(true)
            setShowOTP(true)
        } catch (err) {
            setError('Failed to send verification email. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (showOTP) {
        return (
            <OTPModal 
                email={email}
                type="email-verification"
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600">
                        We need to verify your email address to complete registration
                    </p>
                </div>

                {/* Email Display */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#a7c298]" />
                        <span className="text-gray-700 font-medium">{email}</span>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {otpSent && (
                    <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Verification email sent successfully!
                    </div>
                )}

                {/* Send Verification Button */}
                <button
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="w-full bg-[#a7c298] hover:bg-[#8ba47f] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mb-4"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending verification...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Verification Email
                        </>
                    )}
                </button>

                {/* Skip for now */}
                <div className="text-center">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-[#334727] transition-colors text-sm"
                    >
                        Skip for now (verify later)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailVerificationModal
