'use client'

import React, { useState, useEffect } from 'react';
import type { ProgramPageSchedule } from '@/types/database';

interface ScheduleEditorProps {
  schedule: ProgramPageSchedule | null;
  programId: string;
  onUpdate: (schedule: ProgramPageSchedule) => void;
}

// Default schedule structure
const defaultSchedule: Omit<ProgramPageSchedule, 'id' | 'program_id' | 'created_at' | 'updated_at'> = {
  times: {
    morning: ['9:00 AM - 12:00 PM'],
    afternoon: ['1:00 PM - 4:00 PM'],
    evening: ['6:00 PM - 9:00 PM']
  },
  duration: {
    weekday: {
      label: 'Weekday',
      duration: '3:00'
    },
    weekend: {
      label: 'Weekend',
      duration: '3:00'
    }
  }
};

export default function ScheduleEditor({ schedule, programId, onUpdate }: ScheduleEditorProps) {
  const [currentSchedule, setCurrentSchedule] = useState<ProgramPageSchedule>(() => {
    if (schedule) {
      return schedule;
    }
    // Initialize with default values if no schedule exists
    return {
      id: '',
      program_id: programId,
      ...defaultSchedule,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });

  useEffect(() => {
    if (schedule) {
      setCurrentSchedule(schedule);
    }
  }, [schedule]);

  const handleTimeChange = (period: 'morning' | 'afternoon' | 'evening', value: string) => {
    setCurrentSchedule(prev => ({
      ...prev,
      times: {
        ...prev.times,
        [period]: value.split('|').map(time => time.trim())
      }
    }));
  };

  const handleDurationChange = (type: 'weekday' | 'weekend', field: 'label' | 'duration', value: string) => {
    setCurrentSchedule(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [type]: {
          ...prev.duration[type],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    onUpdate(currentSchedule);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Class Schedule</h3>
        
        {/* Times Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Morning Classes</label>
            <input
              type="text"
              value={currentSchedule.times.morning.join(' | ')}
              onChange={(e) => handleTimeChange('morning', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
              placeholder="e.g. 9:00 AM - 12:00 PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Afternoon Classes</label>
            <input
              type="text"
              value={currentSchedule.times.afternoon.join(' | ')}
              onChange={(e) => handleTimeChange('afternoon', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
              placeholder="e.g. 1:00 PM - 4:00 PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Evening Classes</label>
            <input
              type="text"
              value={currentSchedule.times.evening.join(' | ')}
              onChange={(e) => handleTimeChange('evening', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
              placeholder="e.g. 6:00 PM - 9:00 PM"
            />
          </div>
        </div>

        {/* Duration Section */}
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Class Duration</h4>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weekday Label</label>
              <input
                type="text"
                value={currentSchedule.duration.weekday.label}
                onChange={(e) => handleDurationChange('weekday', 'label', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
                placeholder="e.g. Weekday"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weekday Duration (HH:mm)</label>
              <input
                type="text"
                value={currentSchedule.duration.weekday.duration}
                onChange={(e) => handleDurationChange('weekday', 'duration', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
                placeholder="e.g. 3:00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weekend Label</label>
              <input
                type="text"
                value={currentSchedule.duration.weekend.label}
                onChange={(e) => handleDurationChange('weekend', 'label', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
                placeholder="e.g. Weekend"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weekend Duration (HH:mm)</label>
              <input
                type="text"
                value={currentSchedule.duration.weekend.duration}
                onChange={(e) => handleDurationChange('weekend', 'duration', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
                placeholder="e.g. 3:00"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-[#2596be] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#1a7290] focus:outline-none focus:ring-2 focus:ring-[#2596be] focus:ring-offset-2"
        >
          Save Schedule
        </button>
      </div>
    </div>
  );
} 