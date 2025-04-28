'use client'

import React, { useState } from 'react';
import type { ProgramLevel } from '@/types/database';
import { TrashIcon } from '@heroicons/react/24/outline';

interface LevelsEditorProps {
  levels: ProgramLevel[];
  programId: string;
  onUpdate: (levels: ProgramLevel[]) => Promise<void>;
}

export default function LevelsEditor({ levels, programId, onUpdate }: LevelsEditorProps) {
  const [formData, setFormData] = useState<ProgramLevel[]>(
    levels.length > 0 ? levels : [
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        title: '',
        badge: '',
        duration: '',
        weekly_hours: 0,
        prerequisites: '',
        description: '',
        learning_outcomes: [],
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  );

  const handleInputChange = (index: number, field: keyof ProgramLevel, value: string | number | string[]) => {
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

  const handleOutcomesChange = (index: number, outcomeText: string) => {
    const outcomes = outcomeText.split('\n').filter(outcome => outcome.trim() !== '');
    handleInputChange(index, 'learning_outcomes', outcomes);
  };

  const addLevel = () => {
    setFormData(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        title: '',
        badge: '',
        duration: '',
        weekly_hours: 0,
        prerequisites: '',
        description: '',
        learning_outcomes: [],
        sort_order: prev.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);
  };

  const removeLevel = (index: number) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {formData.map((level, index) => (
          <div key={level.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Level Title
                    </label>
                    <input
                      type="text"
                      value={level.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={level.badge}
                      onChange={(e) => handleInputChange(index, 'badge', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="e.g., A1-A2, Beginner, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={level.duration}
                      onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="e.g., 3 months"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Weekly Hours
                    </label>
                    <input
                      type="number"
                      value={level.weekly_hours}
                      onChange={(e) => handleInputChange(index, 'weekly_hours', parseInt(e.target.value, 10))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="e.g., 6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prerequisites
                  </label>
                  <input
                    type="text"
                    value={level.prerequisites}
                    onChange={(e) => handleInputChange(index, 'prerequisites', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={level.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Learning Outcomes
                  </label>
                  <textarea
                    value={level.learning_outcomes.join('\n')}
                    onChange={(e) => handleOutcomesChange(index, e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter each outcome on a new line"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeLevel(index)}
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
          onClick={addLevel}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Level
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