'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface Feature {
  id: number
  title: string
  description: string
  icon: string
}

export default function WhyChooseUsSection() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadFeatures()
  }, [])

  const loadFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('why_choose_us')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      if (data) setFeatures(data)
    } catch (error) {
      console.error('Error loading features:', error)
      toast.error('Failed to load features')
    }
  }

  const handleSave = async (feature: Feature) => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('why_choose_us')
        .upsert({
          id: feature.id,
          title: feature.title,
          description: feature.description,
          icon: feature.icon
        })

      if (error) throw error

      toast.success('Feature saved successfully!')
      loadFeatures()
      setIsEditing(null)
    } catch (error) {
      console.error('Error saving feature:', error)
      toast.error('Failed to save feature')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('why_choose_us')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Feature deleted successfully!')
      loadFeatures()
    } catch (error) {
      console.error('Error deleting feature:', error)
      toast.error('Failed to delete feature')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Why Choose Us Section</h2>
        <button
          onClick={() => setIsEditing(0)}
          className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
        >
          Add Feature
        </button>
      </div>

      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.id} className="border-b pb-6">
            {isEditing === feature.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => setFeatures(features.map(f => 
                      f.id === feature.id ? { ...f, title: e.target.value } : f
                    ))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => setFeatures(features.map(f => 
                      f.id === feature.id ? { ...f, description: e.target.value } : f
                    ))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => setFeatures(features.map(f => 
                      f.id === feature.id ? { ...f, icon: e.target.value } : f
                    ))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="SVG path or icon class"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(feature)}
                    disabled={isSaving}
                    className={`px-4 py-2 text-white rounded-md ${
                      isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2596be] hover:bg-[#1a7290]'
                    }`}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-gray-600 mt-1">{feature.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(feature.id)}
                    className="text-[#2596be] hover:text-[#1a7290]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 