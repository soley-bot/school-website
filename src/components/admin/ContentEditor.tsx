import React, { useState } from 'react';
import type { ProgramContent } from '@/types/database';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ContentEditorProps {
  content: ProgramContent | null;
  programId: string;
  onUpdate: (content: ProgramContent) => Promise<void>;
}

export default function ContentEditor({ content, programId, onUpdate }: ContentEditorProps) {
  const [formData, setFormData] = useState<ProgramContent>(
    content || {
      id: '',
      program_id: programId,
      section: 'introduction',
      content: {
        text: '',
        image: '',
        whyChooseTitle: 'Why Choose Our Program',
        whyChooseText: ['']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        text: e.target.value
      },
      updated_at: new Date().toISOString()
    }));
  };

  const handleWhyChooseTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        whyChooseTitle: e.target.value
      },
      updated_at: new Date().toISOString()
    }));
  };

  const handleWhyChooseTextChange = (index: number, value: string) => {
    const newWhyChooseText = [...(formData.content.whyChooseText || [])];
    newWhyChooseText[index] = value;
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        whyChooseText: newWhyChooseText
      },
      updated_at: new Date().toISOString()
    }));
  };

  const addWhyChooseText = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        whyChooseText: [...(prev.content.whyChooseText || []), '']
      },
      updated_at: new Date().toISOString()
    }));
  };

  const removeWhyChooseText = (index: number) => {
    const newWhyChooseText = [...(formData.content.whyChooseText || [])];
    newWhyChooseText.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        whyChooseText: newWhyChooseText
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Program Introduction
        </label>
        <textarea
          value={formData.content.text}
          onChange={handleTextChange}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Write a detailed introduction about the program..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why Choose Title
        </label>
        <input
          type="text"
          value={formData.content.whyChooseTitle}
          onChange={handleWhyChooseTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why Choose Points
        </label>
        <div className="space-y-2">
          {formData.content.whyChooseText?.map((text, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => handleWhyChooseTextChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Add a reason to choose this program..."
              />
              <button
                type="button"
                onClick={() => removeWhyChooseText(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWhyChooseText}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Point
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Content
        </button>
      </div>
    </div>
  );
} 