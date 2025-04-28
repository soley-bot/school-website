import React, { useState } from 'react';
import { ProgramFeature } from '@/types/database';

interface FeaturesEditorProps {
  features: ProgramFeature[];
  programId: string;
  onUpdate: (features: ProgramFeature[]) => Promise<void>;
}

export default function FeaturesEditor({ features, programId, onUpdate }: FeaturesEditorProps) {
  const [editedFeatures, setEditedFeatures] = useState<ProgramFeature[]>(features);

  const handleFeatureChange = (index: number, field: keyof ProgramFeature, value: string) => {
    const newFeatures = [...editedFeatures];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    setEditedFeatures(newFeatures);
  };

  const addFeature = () => {
    const now = new Date().toISOString();
    setEditedFeatures([
      ...editedFeatures,
      {
        id: `new-${Date.now()}`,
        program_id: programId,
        icon: 'academic',
        title: '',
        description: '',
        sort_order: editedFeatures.length,
        created_at: now,
        updated_at: now
      }
    ]);
  };

  const removeFeature = (index: number) => {
    setEditedFeatures(editedFeatures.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editedFeatures);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {editedFeatures.map((feature, index) => (
          <div key={feature.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <select
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="academic">Academic</option>
                  <option value="users">Users</option>
                  <option value="chat">Chat</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="globe">Globe</option>
                  <option value="clock">Clock</option>
                  <option value="book">Book</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Feature
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addFeature}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Feature
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Save Features
        </button>
      </div>
    </form>
  );
} 