import { logout } from '@/Utils/Server';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const LogoutModal = ({ isOpen, onClose }) => {
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("See you soon! 👋");
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                    
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Ready to sign off?
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            You're about to log out of your account. Any unsaved work will be lost. 
                            We'll miss you! 😊
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                        >
                            Stay Here
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 px-4 py-2.5 bg-[#334727] hover:bg-[#435f37] text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            Yes, Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};