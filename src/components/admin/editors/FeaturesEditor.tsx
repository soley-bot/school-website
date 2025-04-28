'use client'

import React, { useState } from 'react';
import type { ProgramFeature } from '@/types/database';
import { TrashIcon } from '@heroicons/react/24/outline';

interface FeaturesEditorProps {
  features: ProgramFeature[];
  programId: string;
  onUpdate: (features: ProgramFeature[]) => Promise<void>;
}

export default function FeaturesEditor({ features, programId, onUpdate }: FeaturesEditorProps) {
  const [formData, setFormData] = useState<ProgramFeature[]>(
    features.length > 0 ? features : [
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        title: '',
        description: '',
        icon: 'academic-cap',
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  );

  const handleInputChange = (index: number, field: keyof ProgramFeature, value: string) => {
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [field]: value,
        updated_at: new Date().toISOString()
      };
      return newData;
    });
  };

  const addFeature = () => {
    setFormData(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        title: '',
        description: '',
        icon: 'academic-cap',
        sort_order: prev.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);
  };

  const removeFeature = (index: number) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.map((feature, index) => (
          <div key={feature.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Feature Title
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Icon
                  </label>
                  <select
                    value={feature.icon}
                    onChange={(e) => handleInputChange(index, 'icon', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="academic-cap">Academic Cap</option>
                    <option value="book-open">Book Open</option>
                    <option value="clock">Clock</option>
                    <option value="users">Users</option>
                    <option value="chart-bar">Chart Bar</option>
                    <option value="light-bulb">Light Bulb</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFeature(index)}
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
          onClick={addFeature}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Feature
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