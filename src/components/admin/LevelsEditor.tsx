import React, { useState } from 'react';
import { ProgramLevel } from '@/types/database';

interface LevelsEditorProps {
  levels: ProgramLevel[];
  programId: string;
  onUpdate: (levels: ProgramLevel[]) => Promise<void>;
}

export default function LevelsEditor({ levels, programId, onUpdate }: LevelsEditorProps) {
  const [editedLevels, setEditedLevels] = useState<ProgramLevel[]>(levels);

  const handleLevelChange = (index: number, field: keyof ProgramLevel, value: string | string[] | number) => {
    const newLevels = [...editedLevels];
    newLevels[index] = {
      ...newLevels[index],
      [field]: value
    };
    setEditedLevels(newLevels);
  };

  const handleOutcomesChange = (index: number, outcomeText: string) => {
    const outcomes = outcomeText.split('\n').filter(outcome => outcome.trim() !== '');
    handleLevelChange(index, 'learning_outcomes', outcomes);
  };

  const addLevel = () => {
    const now = new Date().toISOString();
    setEditedLevels([
      ...editedLevels,
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
        sort_order: editedLevels.length,
        created_at: now,
        updated_at: now
      }
    ]);
  };

  const removeLevels = (index: number) => {
    setEditedLevels(editedLevels.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editedLevels);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {editedLevels.map((level, index) => (
          <div key={level.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={level.title}
                  onChange={(e) => handleLevelChange(index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Badge</label>
                <input
                  type="text"
                  value={level.badge}
                  onChange={(e) => handleLevelChange(index, 'badge', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., A1-A2, Beginner, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={level.duration}
                  onChange={(e) => handleLevelChange(index, 'duration', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 3 months"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekly Hours</label>
                <input
                  type="number"
                  value={level.weekly_hours}
                  onChange={(e) => handleLevelChange(index, 'weekly_hours', parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
              <input
                type="text"
                value={level.prerequisites}
                onChange={(e) => handleLevelChange(index, 'prerequisites', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={level.description}
                onChange={(e) => handleLevelChange(index, 'description', e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Learning Outcomes</label>
              <textarea
                value={level.learning_outcomes.join('\n')}
                onChange={(e) => handleOutcomesChange(index, e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter each outcome on a new line"
              />
            </div>
            <button
              type="button"
              onClick={() => removeLevels(index)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Level
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addLevel}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Level
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Save Levels
        </button>
      </div>
    </form>
  );
} 