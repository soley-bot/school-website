'use client';

import React, { useState } from 'react';
import type { ProgramTuition } from '@/types/database';
import { TrashIcon } from '@heroicons/react/24/outline';

interface TuitionEditorProps {
  tuition: ProgramTuition[];
  programId: string;
  onUpdate: (tuition: ProgramTuition[]) => Promise<void>;
}

export default function TuitionEditor({ tuition, programId, onUpdate }: TuitionEditorProps) {
  const [formData, setFormData] = useState<ProgramTuition[]>(
    tuition.length > 0 ? tuition : [
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        price: 0,
        applicable_levels: [],
        levels: [],
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  );

  const handleInputChange = (index: number, field: keyof ProgramTuition, value: any) => {
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

  const handleLevelsChange = (index: number, levelsText: string) => {
    const levels = levelsText.split('\n').filter(level => level.trim() !== '');
    handleInputChange(index, 'levels', levels);
  };

  const handleApplicableLevelsChange = (index: number, levelsText: string) => {
    const levels = levelsText.split(',')
      .map(level => parseInt(level.trim(), 10))
      .filter(level => !isNaN(level));
    handleInputChange(index, 'applicable_levels', levels);
  };

  const addTuition = () => {
    setFormData(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        price: 0,
        applicable_levels: [],
        levels: [],
        sort_order: prev.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);
  };

  const removeTuition = (index: number) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleInputChange(index, 'price', parseFloat(e.target.value))}
                      className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Level Names
                  </label>
                  <textarea
                    value={item.levels.join('\n')}
                    onChange={(e) => handleLevelsChange(index, e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter each level name on a new line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Applicable Level Numbers
                  </label>
                  <input
                    type="text"
                    value={item.applicable_levels.join(', ')}
                    onChange={(e) => handleApplicableLevelsChange(index, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., 1, 2, 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={item.sort_order}
                    onChange={(e) => handleInputChange(index, 'sort_order', parseInt(e.target.value, 10))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    min="0"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeTuition(index)}
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
          onClick={addTuition}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Tuition Level
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