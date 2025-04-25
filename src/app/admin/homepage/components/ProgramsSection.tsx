'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { ProgramContent, NewProgramContent } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TrashIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function ProgramsSection() {
  const router = useRouter()
  const [programs, setPrograms] = useState<ProgramContent[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error

      if (!data || data.length === 0) {
        // Load default programs if none exist
        const defaultPrograms: NewProgramContent[] = [
          {
            name: 'General English Program',
            description: 'Comprehensive training covering speaking, listening, reading, and writing skills for everyday communication.',
            tag: 'Most Popular',
            price: 299,
            features: ['Native English teachers', 'Weekly tests', 'Modern study materials'],
            button_text: 'Learn More',
            button_link: '#',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            name: 'General Chinese Program',
            description: 'Master Mandarin Chinese with our structured curriculum designed for real-world applications.',
            tag: 'Comprehensive',
            price: 349,
            features: ['Native Chinese teachers', 'Character writing practice', 'Cultural immersion'],
            button_text: 'Learn More',
            button_link: '#',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            name: 'Chinese for Primary Students',
            description: 'Fun and engaging Mandarin program specially designed for young learners ages 6-12.',
            tag: 'For Kids',
            price: 249,
            features: ['Age-appropriate methods', 'Interactive activities', 'Regular parent updates'],
            button_text: 'Learn More',
            button_link: '#',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]

        // Insert default programs
        const { data: insertedData, error: insertError } = await supabase
          .from('programs')
          .insert(defaultPrograms)
          .select()

        if (insertError) throw insertError
        if (insertedData) setPrograms(insertedData)
      } else {
        setPrograms(data)
      }
    } catch (error) {
      console.error('Error loading programs:', error)
      setError(error instanceof Error ? error.message : 'Failed to load programs')
    }
  }

  const handleAddProgram = () => {
    const newProgram: NewProgramContent = {
      name: 'New Program',
      description: 'Program description',
      tag: 'New',
      price: 299,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      button_text: 'Learn More',
      button_link: '#',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Create a temporary version for the UI with a fake ID
    const tempId = `temp_${Date.now()}`
    setPrograms([...programs, { ...newProgram, id: tempId } as ProgramContent])
    setExpandedProgram(tempId)
    setSaveSuccess(false)
  }

  const handleRemoveProgram = (index: number) => {
    const newPrograms = [...programs]
    newPrograms.splice(index, 1)
    setPrograms(newPrograms)
    setSaveSuccess(false)
  }

  const handleProgramChange = (index: number, field: keyof ProgramContent, value: string | number | string[]) => {
    const newPrograms = [...programs]
    newPrograms[index] = {
      ...newPrograms[index],
      [field]: value,
      updated_at: new Date().toISOString()
    }
    setPrograms(newPrograms)
    setSaveSuccess(false)
  }

  const handleFeatureChange = (programIndex: number, featureIndex: number, value: string) => {
    const newPrograms = [...programs]
    const features = [...newPrograms[programIndex].features]
    features[featureIndex] = value
    newPrograms[programIndex] = {
      ...newPrograms[programIndex],
      features,
      updated_at: new Date().toISOString()
    }
    setPrograms(newPrograms)
    setSaveSuccess(false)
  }

  const handleAddFeature = (programIndex: number) => {
    const newPrograms = [...programs]
    newPrograms[programIndex].features.push('New Feature')
    setPrograms(newPrograms)
    setSaveSuccess(false)
  }

  const handleRemoveFeature = (programIndex: number, featureIndex: number) => {
    const newPrograms = [...programs]
    newPrograms[programIndex].features.splice(featureIndex, 1)
    setPrograms(newPrograms)
    setSaveSuccess(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      // Filter out temporary IDs
      const programsToSave = programs.map(program => {
        const { id, ...rest } = program
        return {
          ...rest,
          id: id.startsWith('temp_') ? undefined : id,
          updated_at: new Date().toISOString()
        }
      })

      const { error: upsertError } = await supabase
        .from('programs')
        .upsert(programsToSave)

      if (upsertError) throw upsertError

      toast.success('Programs saved successfully!')
      setSaveSuccess(true)
      await loadPrograms() // Reload to get new IDs
    } catch (error) {
      console.error('Save error:', error)
      setError(error instanceof Error ? error.message : 'Failed to save programs')
      toast.error('Failed to save programs')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleProgram = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Programs Section</h2>
          {saveSuccess && (
            <div className="flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Saved successfully!</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {programs.map((program, programIndex) => (
            <div key={program.id} className="border rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleProgram(program.id)}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-[#2596be] font-medium">{program.tag}</span>
                  <h3 className="text-lg font-medium">{program.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveProgram(programIndex)
                    }}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  {expandedProgram === program.id ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {expandedProgram === program.id && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tag
                      </label>
                      <input
                        type="text"
                        value={program.tag}
                        onChange={(e) => handleProgramChange(programIndex, 'tag', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Most Popular, New, For Kids"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Program Name
                      </label>
                      <input
                        type="text"
                        value={program.name}
                        onChange={(e) => handleProgramChange(programIndex, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={program.description}
                      onChange={(e) => handleProgramChange(programIndex, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (USD)
                      </label>
                      <input
                        type="number"
                        value={program.price}
                        onChange={(e) => handleProgramChange(programIndex, 'price', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                        step="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {program.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(programIndex, featureIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(programIndex, featureIndex)}
                              className="text-red-600 hover:text-red-800 px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddFeature(programIndex)}
                          className="flex items-center text-sm text-[#2596be] hover:text-[#1a7290]"
                        >
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Add Feature
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={program.button_text}
                        onChange={(e) => handleProgramChange(programIndex, 'button_text', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={program.button_link}
                        onChange={(e) => handleProgramChange(programIndex, 'button_link', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., /programs/english"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-6 border-t pt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Preview</h4>
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="mb-4">
                        <span className="inline-block bg-[#2596be]/10 text-[#2596be] text-sm font-medium px-3 py-1 rounded-full">
                          {program.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                      <p className="text-gray-600 mb-4">{program.description}</p>
                      <div className="mb-6">
                        <div className="text-2xl font-bold text-[#2596be]">
                          ${program.price}
                        </div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 text-[#2596be] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full bg-[#2596be] text-white py-2 px-4 rounded-md hover:bg-[#1a7290] transition-colors">
                        {program.button_text}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleAddProgram}
            className="flex items-center px-4 py-2 text-[#2596be] bg-[#2596be]/10 rounded-md hover:bg-[#2596be]/20"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Program
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 text-white rounded-md flex items-center ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2596be] hover:bg-[#1a7290]'
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save All Programs'
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 