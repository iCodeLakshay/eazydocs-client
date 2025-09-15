"use client"

import React, { useEffect, useState } from 'react';
import { useUser } from '@/Utils/userContext';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import AuthorInfoCard from './AuthorInfoCard';
import ImageUploadSection from './ImageUploadSection';
import TagsInputSection from './TagsInputSection';
import PublishSettingsCard from './PublishSettingsCard';
import { 
    FileText,
    Save,
    Eye,
    Sparkles,
    PenTool,
    BookCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { createBlog } from '@/Utils/Server';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        <Spinner size="lg" />
    </div>
});

// Import CSS in useEffect to avoid SSR issues
const useQuillStyles = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-quill-new/dist/quill.snow.css');
        }
    }, []);
};


const CreateBlogPage = () => {
    const { user } = useUser();
    const [isMounted, setIsMounted] = useState(false);
    
    // Load Quill styles and set mounted state
    useQuillStyles();
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        banner_image: null,
        banner_image_preview: null,
        tags: [],
        isPublished: false,
        approved: true // by default for demo
    });
    
    const [tagInput, setTagInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Quill configuration
    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote'],
            ['link']
        ],
    };
    
    const quillFormats = [
        'header', 'size',
        'bold', 'italic', 'underline',
        'list',
        'blockquote',
        'link'
    ];

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // Handle banner image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    banner_image: file,
                    banner_image_preview: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove banner image
    const removeBannerImage = () => {
        setFormData(prev => ({
            ...prev,
            banner_image: null,
            banner_image_preview: null
        }));
    };

    // Handle tag addition
    const addTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            if (formData.tags.length >= 5) {
                toast.error('Maximum 5 tags allowed');
                return;
            }
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, trimmedTag]
            }));
            setTagInput('');
        }
    };

    // Remove tag
    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // Handle tag input key press
    const handleTagKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTag();
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!user) {
            toast.error('You must be logged in to create a blog');
            return false;
        }
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        
        if (!formData.subtitle.trim()) {
            newErrors.subtitle = 'Subtitle is required';
        }
        
        if (!formData.content.trim() || formData.content === '<p><br></p>') {
            newErrors.content = 'Content is required';
        }
        
        if (!formData.banner_image) {
            newErrors.banner_image = 'Banner image is required';
        }
        
        if (formData.tags.length === 0) {
            newErrors.tags = 'At least one tag is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('subtitle', formData.subtitle);
            submitData.append('content', formData.content);
            submitData.append('tags', JSON.stringify(formData.tags));
            submitData.append('isPublished', formData.isPublished);
            submitData.append('author', user.id);
            console.log('author', user.id);

            for (let pair of submitData.entries()) {
                console.log(pair[0], pair[1]);
            }

            // Call the createBlog API
            const response = await createBlog(submitData);
            
            if (response && response.blog) {
                toast.success(formData.isPublished ? 'Blog published successfully!' : 'Blog saved as draft!');
                
                // Reset form on success
                setFormData({
                    title: '',
                    subtitle: '',
                    content: '',
                    banner_image: null,
                    banner_image_preview: null,
                    tags: [],
                    isPublished: false,
                    approved: true // by default for demo
                });
                setTagInput('');
            } else {
                toast.error('Failed to create blog. Please try again.');
            }
            
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error(error.message || 'Failed to create blog. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Save as draft
    const saveAsDraft = async () => {
        setFormData(prev => ({ ...prev, isPublished: false }));
        setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
    };

    return (
        <div className="mt-14 min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-[#334727] rounded-full">
                            <PenTool className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold">
                            Create New Blog
                        </h1>
                        <Sparkles className="w-6 h-6 text-[#a8b79e]" />
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Share your knowledge and insights with the EazyDocs community. 
                        Create engaging technical content that helps others learn and grow.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8 bg-white">
                            {/* Basic Information Card */}
                            <Card className="rounded-2xl border-2 border-gray-200 overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#334727] to-[#a8b79e] text-white rounded-t-2xl">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Blog Information</h2>
                                    </div>
                                </CardHeader>
                                <CardBody className="p-6 sm:p-8 space-y-8">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Blog Title *
                                        </label>
                                        <Input
                                            placeholder="Enter an engaging title for your blog"
                                            value={formData.title}
                                            onValueChange={(value) => handleInputChange('title', value)}
                                            isInvalid={!!errors.title}
                                            errorMessage={errors.title}
                                            size="lg"
                                            classNames={{
                                                input: "text-base",
                                                inputWrapper: "rounded-lg border-2 hover:border-[#334727]/50 focus-within:border-[#334727] h-14 shadow-sm"
                                            }}
                                            style={{ outline: 'none' }}
                                        />
                                    </div>

                                    {/* Subtitle */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            Subtitle *
                                        </label>
                                        <Input
                                            placeholder="Add a compelling subtitle to hook your readers"
                                            value={formData.subtitle}
                                            onValueChange={(value) => handleInputChange('subtitle', value)}
                                            isInvalid={!!errors.subtitle}
                                            errorMessage={errors.subtitle}
                                            size="lg"
                                            classNames={{
                                                input: "text-base",
                                                inputWrapper: "rounded-lg border-2 hover:border-[#334727]/50 focus-within:border-[#334727] h-14 shadow-sm"
                                            }}
                                            style={{ outline: 'none' }}
                                        />
                                    </div>

                                    {/* Banner Image */}
                                    <ImageUploadSection
                                        bannerImage={formData.banner_image}
                                        bannerImagePreview={formData.banner_image_preview}
                                        onImageUpload={handleImageUpload}
                                        onImageRemove={removeBannerImage}
                                        error={errors.banner_image}
                                    />

                                    {/* Content Editor */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-gray-800">
                                            Content *
                                        </label>
                                        <Card className="border-2 border-gray-200 overflow-hidden rounded-2xl shadow-sm">
                                            <CardBody className="p-0">
                                                {isMounted ? (
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={formData.content}
                                                        onChange={(value) => handleInputChange('content', value)}
                                                        modules={quillModules}
                                                        formats={quillFormats}
                                                        placeholder="Start writing your blog content here... Share your insights, tutorials, and knowledge with the community."
                                                        style={{ height: '400px' }}
                                                    />
                                                ) : (
                                                    <div className="h-96 bg-gray-100 flex items-center justify-center rounded-2xl">
                                                        <Spinner size="lg" color="primary" />
                                                    </div>
                                                )}
                                            </CardBody>
                                        </Card>
                                        <div style={{ marginBottom: '50px' }}></div>
                                        {errors.content && (
                                            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                                {errors.content}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <TagsInputSection
                                        tags={formData.tags}
                                        tagInput={tagInput}
                                        onTagInputChange={setTagInput}
                                        onAddTag={addTag}
                                        onRemoveTag={removeTag}
                                        onKeyPress={handleTagKeyPress}
                                        error={errors.tags}
                                    />
                                </CardBody>
                            </Card>
                        </div>

                        {/* Right Column - Settings */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Author Info */}
                            <AuthorInfoCard user={user} />

                            {/* Publish Settings */}
                            <PublishSettingsCard
                                isPublished={formData.isPublished}
                                onPublishChange={(value) => handleInputChange('isPublished', value)}
                                approved={formData.approved}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <Card className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <CardBody className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Ready to publish?</h3>
                                    <p className="text-sm text-gray-600">
                                        Review your content and publish when you're satisfied.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <Button
                                        variant="bordered"
                                        color="default"
                                        onClick={saveAsDraft}
                                        isLoading={isLoading}
                                        startContent={<Save className="w-4 h-4" />}
                                        className="w-full sm:w-auto border-2 hover:border-gray-400 rounded-lg"
                                        size="lg"
                                    >
                                        Save as Draft
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        isLoading={isLoading}
                                        startContent={formData.isPublished ? <Eye className="w-4 h-4" /> : <BookCheck className="w-4 h-4" />}
                                        className="bg-gradient-to-r from-[#334727] to-[#2a3d20] hover:from-[#2a3d20] hover:to-[#1e2b16] w-full sm:w-auto shadow-lg rounded-lg text-white"
                                        size="lg"
                                    >
                                        {formData.isPublished ? 'Publish Blog' : 'Publish Now'}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPage;
