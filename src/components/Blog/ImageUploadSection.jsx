import React, { useRef } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Upload, X, Image, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUploadSection = ({ 
    bannerImage, 
    bannerImagePreview, 
    onImageUpload, 
    onImageRemove, 
    error 
}) => {
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const mockEvent = { target: { files: [files[0]] } };
            onImageUpload(mockEvent);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
                Banner Image *
            </label>
            
            {!bannerImagePreview ? (
                <Card 
                    className="border-2 border-dashed border-gray-300 hover:border-[#334727] transition-all duration-200 cursor-pointer group rounded-2xl"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <CardBody className="p-8">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={onImageUpload}
                            className="hidden"
                        />
                        
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#334727]/10 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#334727] transition-colors" />
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Upload Banner Image
                            </h3>
                            
                            <p className="text-gray-600 mb-1">
                                Drag and drop your image here, or click to browse
                            </p>
                            
                            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Image className="w-4 h-4" />
                                    <span>PNG, JPG, WEBP</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Max 5MB</span>
                                </div>
                            </div>
                            
                            <Button 
                                color="primary" 
                                variant="flat" 
                                className="mt-4 bg-[#334727]/10 text-[#334727] hover:bg-[#334727]/20 rounded-xl"
                                startContent={<Upload className="w-4 h-4" />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            >
                                Choose File
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <Card className="overflow-hidden rounded-2xl shadow-sm">
                    <CardBody className="p-0 relative">
                        <div className="relative group">
                            <img
                                src={bannerImagePreview}
                                alt="Banner preview"
                                className="w-full h-64 object-cover"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <div className="flex gap-3">
                                    <Button
                                        size="sm"
                                        onClick={handleClick}
                                        startContent={<Upload className="w-4 h-4" />}
                                        className='bg-white text-gray-800 hover:bg-gray-100 rounded-lg'
                                    >
                                        Replace
                                    </Button>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={onImageRemove}
                                        startContent={<X className="w-4 h-4" />}
                                        className='bg-red-700 text-white hover:bg-red-600 rounded-lg'
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Remove button (always visible) */}
                            <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                className="absolute top-3 right-3 z-10"
                                onClick={onImageRemove}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={onImageUpload}
                            className="hidden"
                        />
                    </CardBody>
                </Card>
            )}
            
            {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default ImageUploadSection;