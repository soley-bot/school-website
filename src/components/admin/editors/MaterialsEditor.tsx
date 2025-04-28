'use client';

import React, { useState } from 'react';
import type { CourseMaterial } from '@/types/database';
import { TrashIcon } from '@heroicons/react/24/outline';
import ImageUploader from '@/components/ui/ImageUploader';

interface MaterialsEditorProps {
  materials: CourseMaterial[];
  programId: string;
  onUpdate: (materials: CourseMaterial[]) => Promise<void>;
}

export default function MaterialsEditor({ materials, programId, onUpdate }: MaterialsEditorProps) {
  const [formData, setFormData] = useState<CourseMaterial[]>(
    materials.length > 0 ? materials : [
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        name: '',
        description: '',
        image_url: '',
        created_at: new Date().toISOString()
      }
    ]
  );

  const handleInputChange = (index: number, field: keyof CourseMaterial, value: string) => {
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [field]: value
      };
      return newData;
    });
  };

  const handleImageUpload = (index: number, url: string) => {
    handleInputChange(index, 'image_url', url);
  };

  const addMaterial = () => {
    setFormData(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        name: '',
        description: '',
        image_url: '',
        created_at: new Date().toISOString()
      }
    ]);
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.map((material, index) => (
          <div key={material.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Material Name
                  </label>
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={material.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <ImageUploader
                    currentImageUrl={material.image_url}
                    onImageUploaded={(url) => handleImageUpload(index, url)}
                    folder="course-materials"
                    id={material.id}
                    className="mt-1"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeMaterial(index)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addMaterial}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Material
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 