'use client'

import React, { useState } from 'react';
import { Program } from '@/types/database';
import ImageUploader from '@/components/ui/ImageUploader';

interface BasicInfoEditorProps {
  program: Program;
  onUpdate: (data: Program) => void;
}

interface BasicInfoData {
  name: string;
  description: string;
  slug: string;
  theme: "blue" | "red";
  introduction?: {
    image?: string;
  };
}

export default function BasicInfoEditor({ program, onUpdate }: BasicInfoEditorProps) {
  const [formData, setFormData] = useState<BasicInfoData>({
    name: program.name || '',
    description: program.description || '',
    slug: program.slug || '',
    theme: program.theme || 'blue',
    introduction: {
      image: program.introduction?.image || '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'theme' && value !== 'blue' && value !== 'red') {
      return; // Only allow 'blue' or 'red' for theme
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      introduction: {
        ...prev.introduction,
        image: imageUrl,
      },
    }));
  };

  const handleSave = () => {
    onUpdate({
      ...program,
      ...formData,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Program Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          URL Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          value={formData.slug}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
          Theme Color
        </label>
        <select
          name="theme"
          id="theme"
          value={formData.theme}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Introduction Image</label>
        <ImageUploader
          currentImageUrl={formData.introduction?.image}
          onImageUploaded={handleImageUpload}
          folder="program-images"
          id={program.id}
          className="mt-1"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 