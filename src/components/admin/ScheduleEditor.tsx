import React, { useState } from 'react';
import { ProgramSchedule } from '@/types/database';

interface ScheduleEditorProps {
  schedule: ProgramSchedule | null;
  programId: string;
  onUpdate: (schedule: ProgramSchedule) => Promise<void>;
}

export default function ScheduleEditor({ schedule, programId, onUpdate }: ScheduleEditorProps) {
  const [editedSchedule, setEditedSchedule] = useState<ProgramSchedule>(
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
    setEditedSchedule(prev => ({
      ...prev,
      times: {
        ...prev.times,
        [period]: value
      }
    }));
  };

  const handleDurationChange = (type: 'weekday' | 'weekend', field: 'hours' | 'minutes', value: number) => {
    setEditedSchedule(prev => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editedSchedule);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Class Times */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Class Times</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Morning</label>
              <input
                type="text"
                value={editedSchedule.times.morning}
                onChange={(e) => handleTimeChange('morning', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 9:00 AM - 10:30 AM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Afternoon</label>
              <input
                type="text"
                value={editedSchedule.times.afternoon}
                onChange={(e) => handleTimeChange('afternoon', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 2:00 PM - 3:30 PM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Evening</label>
              <input
                type="text"
                value={editedSchedule.times.evening}
                onChange={(e) => handleTimeChange('evening', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 7:00 PM - 8:30 PM"
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekday Duration */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Weekday</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hours</label>
                  <input
                    type="number"
                    value={editedSchedule.duration.weekday.hours}
                    onChange={(e) => handleDurationChange('weekday', 'hours', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minutes</label>
                  <input
                    type="number"
                    value={editedSchedule.duration.weekday.minutes}
                    onChange={(e) => handleDurationChange('weekday', 'minutes', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                    max="59"
                  />
                </div>
              </div>
            </div>

            {/* Weekend Duration */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Weekend</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hours</label>
                  <input
                    type="number"
                    value={editedSchedule.duration.weekend.hours}
                    onChange={(e) => handleDurationChange('weekend', 'hours', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minutes</label>
                  <input
                    type="number"
                    value={editedSchedule.duration.weekend.minutes}
                    onChange={(e) => handleDurationChange('weekend', 'minutes', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                    max="59"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Save Schedule
        </button>
      </div>
    </form>
  );
} 