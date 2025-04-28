'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import { Program } from '@/types/database';
import ImageUploader from './ImageUploader';
import { toast } from 'react-hot-toast';

interface BasicInfoEditorProps {
  program: Program;
  onUpdate: (updatedInfo: Partial<Program>) => Promise<void>;
}

export default function BasicInfoEditor({ program, onUpdate }: BasicInfoEditorProps) {
  const [formData, setFormData] = useState<Partial<Program>>(program);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    typeof program.hero_image === 'string' ? program.hero_image : undefined
  );

  // Cleanup preview URL when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== program.hero_image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, program.hero_image]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      console.log('Image upload started:', file.name);
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Create a preview URL for the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      setSelectedImage(file);
      setFormData(prev => ({
        ...prev,
        hero_image: file
      }));
      console.log('Image set in form data');
    } catch (error) {
      console.error('Error in handleImageUpload:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Form submission started');
      console.log('Selected image:', selectedImage);
      console.log('Form data:', {
        ...formData,
        hero_image: formData.hero_image instanceof File 
          ? `[File: ${(formData.hero_image as File).name}]` 
          : formData.hero_image
      });
      
      await onUpdate(formData);
      console.log('Form submission completed');
      toast.success('Program information saved successfully');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Failed to save program information');
    }
  };

  const handleThemeChange = (theme: 'blue' | 'red') => {
    setFormData(prev => ({
      ...prev,
      theme
    }));
    onUpdate({
      ...formData,
      theme
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Program Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g., General English Program"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Slug (auto-generated)
        </label>
        <input
          type="text"
          value={formData.slug}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          readOnly
        />
        <p className="mt-1 text-sm text-gray-500">
          This will be used in the URL: /programs/{formData.slug}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Describe the program..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme Color
        </label>
        <select
          value={formData.theme}
          onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value as 'blue' | 'red' }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hero Image
        </label>
        <ImageUploader
          currentImage={previewUrl}
          onUpload={handleImageUpload}
          className="mt-1"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Basic Info
        </button>
      </div>
    </form>
  );
} 