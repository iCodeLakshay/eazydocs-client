import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const ApprovalStatus = ({ 
    approved, 
    isPublished = false, 
    size = "default", 
    showText = true 
}) => {
    if (approved === null && !isPublished) {
        return null; // Don't show anything for drafts
    }

    const getStatusConfig = () => {
        if (approved === true) {
            return {
                icon: CheckCircle,
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                textColor: 'text-green-700',
                iconColor: 'text-green-500',
                title: 'Approved',
                description: 'This blog has been approved by admin and is live'
            };
        } else if (approved === false) {
            return {
                icon: XCircle,
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                textColor: 'text-red-700',
                iconColor: 'text-red-500',
                title: 'Not Approved',
                description: 'This blog needs admin approval before it can go live'
            };
        } else {
            return {
                icon: Clock,
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                textColor: 'text-yellow-700',
                iconColor: 'text-yellow-500',
                title: 'Pending Approval',
                description: 'Blog is published but waiting for admin approval'
            };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    // Icon only version for compact display
    if (!showText) {
        const iconSize = size === "small" ? "w-4 h-4" : size === "large" ? "w-6 h-6" : "w-5 h-5";
        return (
            <div className="flex items-center" title={config.title}>
                <Icon className={`${iconSize} ${config.iconColor}`} />
            </div>
        );
    }

    // Full version with text
    const paddingSize = size === "small" ? "p-2" : size === "large" ? "p-6" : "p-4";
    const iconSize = size === "small" ? "w-4 h-4" : size === "large" ? "w-6 h-6" : "w-5 h-5";
    const titleSize = size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";
    const descSize = size === "small" ? "text-xs" : size === "large" ? "text-base" : "text-sm";

    return (
        <div className={`flex items-center gap-3 ${paddingSize} rounded-lg border ${config.bgColor} ${config.borderColor}`}>
            <Icon className={`${iconSize} ${config.iconColor}`} />
            <div>
                <p className={`font-medium ${config.textColor} ${titleSize}`}>
                    {config.title}
                </p>
                <p className={`${config.textColor} ${descSize} opacity-80`}>
                    {config.description}
                </p>
            </div>
        </div>
    );
};

export default ApprovalStatus;