import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { 
    Settings, 
    Eye, 
    FileText, 
    AlertCircle, 
    CheckCircle, 
    Clock,
    Shield
} from 'lucide-react';

const PublishSettingsCard = ({ isPublished, onPublishChange, approved = null }) => {
    const getApprovalStatus = () => {
        if (approved === true) {
            return {
                icon: CheckCircle,
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                title: 'Blog Approved',
                description: 'Your blog has been approved and is live'
            };
        } else if (approved === false) {
            return {
                icon: AlertCircle,
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                title: 'Needs Approval',
                description: 'Your blog requires admin approval before going live'
            };
        } else {
            return {
                icon: Clock,
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                title: 'Pending Review',
                description: 'Your blog will be reviewed by our admin team'
            };
        }
    };

    const approvalStatus = getApprovalStatus();
    const ApprovalIcon = approvalStatus.icon;

    return (
        <Card className="rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#334727]" />
                    <h3 className="text-lg font-semibold text-gray-800">Publish Status</h3>
                </div>
            </CardHeader>
            
            <CardBody className="pt-2 space-y-4">
                {/* Publish Toggle */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="flex-shrink-0 mt-1">
                        {isPublished ? (
                            <Eye className="w-5 h-5 text-green-600" />
                        ) : (
                            <FileText className="w-5 h-5 text-gray-600" />
                        )}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">
                                {isPublished ? 'Blog Published' : 'Publish Now'}
                            </h4>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-medium ${isPublished ? 'text-[#334727]' : 'text-gray-600'}`}>
                                    {isPublished ? 'Published' : 'Publish'}
                                </span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isPublished}
                                    aria-label="Toggle publish"
                                    onClick={() => onPublishChange(!isPublished)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onPublishChange(!isPublished);
                                        }
                                    }}
                                    className={`relative w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        isPublished ? 'bg-[#334727] focus:ring-[#334727]' : 'bg-gray-300 focus:ring-gray-400'
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                                            isPublished ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {isPublished
                                ? 'Your blog will be published and visible to all users after admin approval'
                                : 'Your blog will be saved as draft and can be published later'}
                        </p>
                        
                        {isPublished && (
                            <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-blue-50 rounded-lg">
                                <Shield className="w-4 h-4 text-blue-600" />
                                <span className="text-xs text-blue-700 font-medium">
                                    Requires admin approval before going live
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Approval Status */}
                <div className={`flex items-start gap-4 p-4 rounded-xl border-2 ${approvalStatus.bgColor} ${approvalStatus.borderColor}`}>
                    <div className="flex-shrink-0 mt-1">
                        <ApprovalIcon className={`w-5 h-5 ${approvalStatus.color}`} />
                    </div>
                    
                    <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${approvalStatus.color}`}>
                            {approvalStatus.title}
                        </h4>
                        <p className={`text-sm ${approvalStatus.color} opacity-80`}>
                            {approvalStatus.description}
                        </p>
                    </div>
                </div>
                
                {/* Additional Info */}
                <div className="bg-gradient-to-r from-[#334727]/5 to-[#a8b79e]/5 rounded-xl p-4 border border-[#334727]/10">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-[#334727] mt-0.5 flex-shrink-0" />
                        <div>
                            <h5 className="font-medium text-[#334727] text-sm mb-1">
                                Content Guidelines
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Ensure your content follows our community guidelines. 
                                Technical blogs with clear explanations and examples are preferred.
                            </p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PublishSettingsCard;