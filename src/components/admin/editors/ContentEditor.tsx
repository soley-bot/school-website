'use client'

import React, { useState, useEffect } from 'react';
import type { ProgramPageContent } from '@/types/database';
import { toast } from 'react-hot-toast';

interface ContentEditorProps {
  content: ProgramPageContent | null;
  programId: string;
  onUpdate: (content: ProgramPageContent) => void;
}

interface ContentData {
  text: string;
  image: string;
  whyChooseTitle: string;
  whyChooseText: Array<string>;
}

interface FormData {
  content: ContentData;
}

const defaultContent: ContentData = {
  text: '',
  image: '',
  whyChooseTitle: '',
  whyChooseText: []
};

export default function ContentEditor({ content, programId, onUpdate }: ContentEditorProps) {
  const [formData, setFormData] = useState<FormData>({
    content: content?.content || defaultContent
  });

  useEffect(() => {
    if (content) {
      setFormData({
        content: content.content || defaultContent
      });
    }
  }, [content]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        text: e.target.value
      }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        image: e.target.value
      }
    }));
  };

  const handleWhyChooseTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        whyChooseTitle: e.target.value
      }
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
      }
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
      }
    }));
  };

  const addWhyChooseText = () => {
    const newWhyChooseText = [...(formData.content.whyChooseText || []), ''];
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        whyChooseText: newWhyChooseText
      }
    }));
  };

  const handleSave = () => {
    const updatedContent: ProgramPageContent = {
      id: content?.id || '',
      program_id: programId,
      section: 'introduction',
      content: formData.content,
      created_at: content?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onUpdate(updatedContent);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Introduction Text
        </label>
        <textarea
          value={formData.content.text}
          onChange={handleTextChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
          placeholder="Enter program introduction..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Introduction Image URL
        </label>
        <input
          type="text"
          value={formData.content.image}
          onChange={handleImageChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
          placeholder="Enter image URL..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Why Choose Us Title
        </label>
        <input
          type="text"
          value={formData.content.whyChooseTitle}
          onChange={handleWhyChooseTitleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
          placeholder="Enter section title..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why Choose Us Points
        </label>
        <div className="space-y-2">
          {formData.content.whyChooseText?.map<JSX.Element>((text: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => handleWhyChooseTextChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2596be] focus:ring-[#2596be] sm:text-sm"
                placeholder="Enter a reason"
              />
              <button
                type="button"
                onClick={() => removeWhyChooseText(index)}
                className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWhyChooseText}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-[#2596be] bg-[#2596be]/10 hover:bg-[#2596be]/20"
          >
            Add Point
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-[#2596be] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#1a7290] focus:outline-none focus:ring-2 focus:ring-[#2596be] focus:ring-offset-2"
        >
          Save Content
        </button>
      </div>
    </div>
  );
} 