import React from 'react';
import { Card, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Plus, Hash, AlertTriangle } from 'lucide-react';

const TagsInputSection = ({ 
    tags, 
    tagInput, 
    onTagInputChange, 
    onAddTag, 
    onRemoveTag, 
    onKeyPress,
    error 
}) => {
    return (
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800">
                Tags * <span className="text-gray-500 font-normal">(Maximum 5 tags)</span>
            </label>
            
            {/* Tag Input */}
            <div className="flex gap-3">
                <Input
                    placeholder="Add a tag (e.g., JavaScript, React, Tutorial)"
                    value={tagInput}
                    onValueChange={onTagInputChange}
                    onKeyPress={onKeyPress}
                    className="flex-1"
                    startContent={<Hash className="w-4 h-4 text-gray-400" />}
                    classNames={{
                        input: "text-sm",
                        inputWrapper: "border-2 hover:border-[#334727]/50 focus-within:border-[#334727] rounded-lg"
                    }}
                    style={{ outline: 'none' }}
                />
                <Button
                    color="primary"
                    onClick={onAddTag}
                    isDisabled={!tagInput.trim() || tags.length >= 5}
                    className="bg-[#334727] hover:bg-[#2a3d20] px-6 rounded-lg text-white"
                    startContent={<Plus className="w-4 h-4" />}
                >
                    Add
                </Button>
            </div>
            
            {/* Tags Display */}
            {tags.length > 0 ? (
                <Card className="border-2 border-gray-100 rounded-2xl">
                    <CardBody className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Hash className="w-4 h-4 text-[#334727]" />
                            <span className="text-sm font-semibold text-gray-700">
                                Added Tags ({tags.length}/5)
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mx-1">
                            {tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    onClose={() => onRemoveTag(tag)}
                                    variant="flat"
                                    color="primary"
                                    size="md"
                                    className="bg-[#334727]/10 text-[#334727] hover:bg-[#334727]/20 transition-colors p-1 text-sm"
                                    classNames={{
                                        content: "font-medium",
                                        closeButton: "hover:bg-red-500 hover:text-white rounded-full",
                                    }}
                                >
                                    {tag}
                                </Chip>
                            ))}
                        </div>
                        
                        {tags.length >= 5 && (
                            <div className="flex items-center gap-2 text-amber-600 text-xs mt-3 p-2 bg-amber-50 rounded-lg">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Maximum number of tags reached</span>
                            </div>
                        )}
                    </CardBody>
                </Card>
            ) : (
                <Card className="border-2 border-dashed border-gray-200 rounded-2xl">
                    <CardBody className="p-6 text-center">
                        <Hash className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                            No tags added yet. Tags help readers find your content easily.
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                            Add tags like "JavaScript", "Tutorial", "Web Development"
                        </p>
                    </CardBody>
                </Card>
            )}
            
            {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default TagsInputSection;