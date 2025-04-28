'use client'

import React, { useState } from 'react';
import type { ProgramSchedule } from '@/types/database';

interface ScheduleEditorProps {
  schedule: ProgramSchedule;
  programId: string;
  onUpdate: (schedule: ProgramSchedule) => Promise<void>;
}

export default function ScheduleEditor({ schedule, programId, onUpdate }: ScheduleEditorProps) {
  const [formData, setFormData] = useState<ProgramSchedule>(
    schedule || {
      id: `new-${Date.now()}`,
      program_id: programId,
      times: {
        morning: '',
        afternoon: '',
        evening: ''
      },
      duration: {
        weekday: {
          hours: 0,
          minutes: 0
        },
        weekend: {
          hours: 0,
          minutes: 0
        }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  );

  const handleTimeChange = (period: keyof ProgramSchedule['times'], value: string) => {
    setFormData(prev => ({
      ...prev,
      times: {
        ...prev.times,
        [period]: value
      },
      updated_at: new Date().toISOString()
    }));
  };

  const handleDurationChange = (type: 'weekday' | 'weekend', field: 'hours' | 'minutes', value: number) => {
    setFormData(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [type]: {
          ...prev.duration[type],
          [field]: value
        }
      },
      updated_at: new Date().toISOString()
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Class Times</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Morning Session
            </label>
            <input
              type="text"
              value={formData.times.morning}
              onChange={(e) => handleTimeChange('morning', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 9:00 AM - 12:00 PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Afternoon Session
            </label>
            <input
              type="text"
              value={formData.times.afternoon}
              onChange={(e) => handleTimeChange('afternoon', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 1:00 PM - 4:00 PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Evening Session
            </label>
            <input
              type="text"
              value={formData.times.evening}
              onChange={(e) => handleTimeChange('evening', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 6:00 PM - 9:00 PM"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Duration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Weekday Classes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  type="number"
                  value={formData.duration.weekday.hours}
                  onChange={(e) => handleDurationChange('weekday', 'hours', parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minutes
                </label>
                <input
                  type="number"
                  value={formData.duration.weekday.minutes}
                  onChange={(e) => handleDurationChange('weekday', 'minutes', parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Weekend Classes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  type="number"
                  value={formData.duration.weekend.hours}
                  onChange={(e) => handleDurationChange('weekend', 'hours', parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minutes
                </label>
                <input
                  type="number"
                  value={formData.duration.weekend.minutes}
                  onChange={(e) => handleDurationChange('weekend', 'minutes', parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
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