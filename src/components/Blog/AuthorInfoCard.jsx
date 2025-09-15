import React from 'react';
import { Card, CardBody } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { User, Calendar, CheckCircle } from 'lucide-react';

const AuthorInfoCard = ({ user }) => {
    return (
        <Card className="rounded-md border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardBody className="p-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar
                            src={user?.profile_picture || "/placeholder/profile.jpg"}
                            alt={user?.name}
                            className="size-18 ring-4 ring-[#334727]/10"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500 font-medium">Author</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#334727] mb-1">
                            {user?.name || 'Loading...'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span className='text-[12px]'>Member since {new Date().getFullYear()}</span>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            <span>Verified Author</span>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default AuthorInfoCard;