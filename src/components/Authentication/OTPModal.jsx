'use client'
import React, { useState, useRef, useEffect } from 'react'
import { X, ArrowLeft, Shield, CheckCircle } from 'lucide-react'

const OTPModal = ({ email, type, onClose, onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    
    const inputRefs = useRef([])

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus()
    }, [])

    useEffect(() => {
        // Resend cooldown timer
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return // Prevent multiple digits

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        // Clear error when user types
        if (error) setError('')
    }

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        const newOtp = [...otp]
        
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            if (/^\d$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i]
            }
        }
        
        setOtp(newOtp)
        
        // Focus last filled input or next empty one
        const lastFilledIndex = newOtp.findLastIndex(digit => digit !== '')
        if (lastFilledIndex < 5) {
            inputRefs.current[lastFilledIndex + 1]?.focus()
        }
    }

    const handleVerifyOTP = async () => {
        const otpString = otp.join('')
        
        if (otpString.length !== 6) {
            setError('Please enter all 6 digits')
            return
        }

        setLoading(true)
        setError('')

        try {
            // TODO: Implement OTP verification API calls
            if (type === 'forgot-password') {
                // const result = await verifyForgotPasswordOTP(email, otpString)
            } else if (type === 'email-verification') {
                // const result = await verifyEmailOTP(email, otpString)
            }
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            setSuccess(true)
            setTimeout(() => {
                onClose()
                // Redirect based on type
                if (type === 'email-verification') {
                    window.location.href = '/login'
                }
            }, 2000)
            
        } catch (err) {
            setError('Invalid OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResendOTP = async () => {
        if (resendCooldown > 0) return

        setLoading(true)
        setError('')

        try {
            // TODO: Implement resend OTP API call
            // await resendOTP(email, type)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            setResendCooldown(30) // 30 second cooldown
            setOtp(['', '', '', '', '', '']) // Clear OTP inputs
            inputRefs.current[0]?.focus()
            
        } catch (err) {
            setError('Failed to resend OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getTitle = () => {
        return type === 'forgot-password' ? 'Reset Password' : 'Verify Email'
    }

    const getDescription = () => {
        return type === 'forgot-password' 
            ? 'Enter the 6-digit code sent to your email to reset your password'
            : 'Enter the 6-digit code sent to your email to verify your account'
    }

    if (success) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Successful!</h2>
                    <p className="text-gray-600">
                        {type === 'forgot-password' 
                            ? 'You can now reset your password' 
                            : 'Your email has been verified successfully'
                        }
                    </p>
                </div>
            </div>
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

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-6 mt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#a7c298]/20 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-[#a7c298]" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{getTitle()}</h2>
                    <p className="text-gray-600 text-sm">{getDescription()}</p>
                    <p className="text-[#a7c298] font-medium mt-2">{email}</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* OTP Input */}
                <div className="mb-6">
                    <div className="flex gap-3 justify-center mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#a7c298] focus:border-[#a7c298] outline-none transition-all"
                            />
                        ))}
                    </div>
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.join('').length !== 6}
                    className="w-full bg-[#a7c298] hover:bg-[#8ba47f] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-4"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Verifying...
                        </div>
                    ) : (
                        'Verify OTP'
                    )}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
                    <button
                        onClick={handleResendOTP}
                        disabled={resendCooldown > 0 || loading}
                        className="text-[#a7c298] hover:text-[#8ba47f] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {resendCooldown > 0 
                            ? `Resend in ${resendCooldown}s` 
                            : 'Resend OTP'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OTPModal
