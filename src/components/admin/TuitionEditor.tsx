import React, { useState } from 'react';
import { ProgramTuition } from '@/types/database';

interface TuitionEditorProps {
  tuition: ProgramTuition[];
  programId: string;
  onUpdate: (tuition: ProgramTuition[]) => Promise<void>;
}

export default function TuitionEditor({ tuition, programId, onUpdate }: TuitionEditorProps) {
  const [editedTuition, setEditedTuition] = useState<ProgramTuition[]>(tuition);

  const handleTuitionChange = (index: number, field: keyof ProgramTuition, value: any) => {
    const newTuition = [...editedTuition];
    if (field === 'levels') {
      newTuition[index] = {
        ...newTuition[index],
        levels: value.split('\n').filter((level: string) => level.trim() !== ''),
        applicable_levels: value.split('\n')
          .filter((level: string) => level.trim() !== '')
          .map((_: string, i: number) => i + 1)
      };
    } else {
      newTuition[index] = {
        ...newTuition[index],
        [field]: value
      };
    }
    setEditedTuition(newTuition);
  };

  const addTuition = () => {
    const now = new Date().toISOString();
    setEditedTuition([
      ...editedTuition,
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        price: 0,
        applicable_levels: [],
        levels: [],
        sort_order: editedTuition.length,
        created_at: now,
        updated_at: now
      }
    ]);
  };

  const removeTuition = (index: number) => {
    setEditedTuition(editedTuition.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editedTuition);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {editedTuition.map((item, index) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleTuitionChange(index, 'price', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Levels</label>
                <textarea
                  value={item.levels.join('\n')}
                  onChange={(e) => handleTuitionChange(index, 'levels', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter each level on a new line"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeTuition(index)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Tuition
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addTuition}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Tuition
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Save Tuition
        </button>
      </div>
    </form>
  );
} 