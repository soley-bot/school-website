'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/auth'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import ImageUploader from '@/components/ui/ImageUploader'
import { exampleProgramLevel, exampleProgramFeature, exampleCourseMaterial, programIcons } from '@/lib/programExamples'

interface ProgramLevel {
  title: string
  badge: string
  duration: string
  weeklyHours: string
  prerequisites: string
  description: string
  outcomes: string[]
}

interface ProgramFeature {
  icon: 'academic' | 'users' | 'chat' | 'puzzle' | 'globe' | 'clock' | 'book'
  title: string
  description: string
}

interface CourseMaterial {
  title: string
  description: string
  image: string
  level: string
}

// Add initial test data
const initialPrograms = [
  {
    name: 'General English',
    slug: 'english-general',
    type: 'english',
    description: 'Comprehensive English language program for all levels',
    theme: 'blue',
    features: [
      {
        title: 'Native Speakers',
        icon: 'users',
        description: 'Learn from experienced native English speakers'
      },
      {
        title: 'All Levels',
        icon: 'academic',
        description: 'From beginner to advanced levels'
      }
    ]
  },
  {
    name: 'General Chinese',
    slug: 'chinese-general',
    type: 'chinese',
    description: 'Learn Mandarin Chinese from basic to advanced',
    theme: 'red',
    features: [
      {
        title: 'Native Teachers',
        icon: 'users',
        description: 'Learn from native Chinese speakers'
      },
      {
        title: 'HSK Preparation',
        icon: 'academic',
        description: 'Prepare for HSK examinations'
      }
    ]
  },
  {
    name: 'IELTS Preparation',
    slug: 'english-ielts',
    type: 'ielts',
    description: 'Specialized program for IELTS exam preparation',
    theme: 'blue',
    features: [
      {
        title: 'Exam Strategies',
        icon: 'book',
        description: 'Learn effective IELTS test strategies'
      },
      {
        title: 'Practice Tests',
        icon: 'academic',
        description: 'Regular mock tests and feedback'
      }
    ]
  }
];

export default function NewProgramPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    theme: 'blue' as 'red' | 'blue',
    slug: '',
    introduction: {
      text: '',
      image: '',
      whyChooseTitle: '',
      whyChooseText: ['', '']
    },
    schedule: {
      times: {
        morning: ['8:00-9:30 A.M.', '9:30-11:00 A.M.'],
        afternoon: ['1:30-3:00 P.M.', '3:00-4:30 P.M.'],
        evening: ['5:15-6:45 P.M.', '6:45-8:15 P.M.']
      },
      duration: {
        weekday: {
          label: 'Monday - Friday',
          duration: '2.5 Months'
        },
        weekend: {
          label: 'Saturday & Sunday',
          duration: '10 Weeks'
        }
      }
    },
    levels: [] as ProgramLevel[],
    features: [] as ProgramFeature[],
    course_materials: [] as CourseMaterial[],
  })
  const [isInitializing, setIsInitializing] = useState(false);

  const handleAddLevel = () => {
    setFormData({
      ...formData,
      levels: [
        ...formData.levels,
        { ...exampleProgramLevel, title: '', badge: '', outcomes: [''] }
      ]
    })
  }

  const handleLevelChange = (index: number, field: keyof ProgramLevel, value: any) => {
    const newLevels = [...formData.levels]
    newLevels[index] = { ...newLevels[index], [field]: value }
    setFormData({ ...formData, levels: newLevels })
  }

  const handleAddOutcome = (levelIndex: number) => {
    const newLevels = [...formData.levels]
    newLevels[levelIndex].outcomes.push('')
    setFormData({ ...formData, levels: newLevels })
  }

  const handleOutcomeChange = (levelIndex: number, outcomeIndex: number, value: string) => {
    const newLevels = [...formData.levels]
    newLevels[levelIndex].outcomes[outcomeIndex] = value
    setFormData({ ...formData, levels: newLevels })
  }

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [
        ...formData.features,
        { ...exampleProgramFeature, title: '', description: '' }
      ]
    })
  }

  const handleFeatureChange = (index: number, field: keyof ProgramFeature, value: any) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFormData({ ...formData, features: newFeatures })
  }

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      course_materials: [
        ...formData.course_materials,
        { ...exampleCourseMaterial, title: '', description: '', image: '', level: '' }
      ]
    })
  }

  const handleMaterialChange = (index: number, field: keyof CourseMaterial, value: string) => {
    const newMaterials = [...formData.course_materials]
    newMaterials[index] = { ...newMaterials[index], [field]: value }
    setFormData({ ...formData, course_materials: newMaterials })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name.trim()) throw new Error('Program name is required')
      if (!formData.description.trim()) throw new Error('Description is required')
      if (!formData.introduction.text.trim()) throw new Error('Introduction text is required')
      if (formData.levels.length === 0) throw new Error('At least one level is required')
      if (formData.features.length === 0) throw new Error('At least one feature is required')

      // Generate slug from name
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const programId = uuidv4()

      // Create the program page
      const { error: programError } = await supabase
        .from('program_pages')
        .insert([{
          id: programId,
          ...formData,
          slug,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])

      if (programError) throw programError

      // Create related records
      const promises = []

      // Insert program content
      promises.push(
        supabase
          .from('program_content')
          .insert([{
            program_id: programId,
            section: 'introduction',
            content: formData.introduction.text
          }])
      )

      // Insert program features
      if (formData.features.length > 0) {
        promises.push(
          supabase
            .from('program_features')
            .insert(
              formData.features.map((feature, index) => ({
                program_id: programId,
                ...feature,
                sort_order: index
              }))
            )
        )
      }

      // Insert program levels
      if (formData.levels.length > 0) {
        promises.push(
          supabase
            .from('program_levels')
            .insert(
              formData.levels.map((level, index) => ({
                program_id: programId,
                ...level,
                sort_order: index
              }))
            )
        )
      }

      // Insert course materials
      if (formData.course_materials.length > 0) {
        promises.push(
          supabase
            .from('course_materials')
            .insert(
              formData.course_materials.map((material, index) => ({
                program_id: programId,
                ...material,
                sort_order: index
              }))
            )
        )
      }

      // Insert schedule
      if (formData.schedule) {
        promises.push(
          supabase
            .from('program_schedule')
            .insert([{
              program_id: programId,
              ...formData.schedule
            }])
        )
      }

      // Wait for all insertions to complete
      await Promise.all(promises)

      toast.success('Program page created successfully')
      router.push('/admin/academics')
    } catch (error: any) {
      console.error('Error creating program:', error)
      toast.error(error.message || 'Failed to create program')
    } finally {
      setIsSubmitting(false)
    }
  }

  const initializeTestData = async () => {
    setIsInitializing(true);
    try {
      for (const program of initialPrograms) {
        // First create the program
        const { data: programData, error: programError } = await supabase
          .from('program_pages')
          .insert({
            name: program.name,
            slug: program.slug,
            type: program.type,
            description: program.description,
            theme: program.theme
          })
          .select()
          .single();

        if (programError) throw programError;

        // Then add its features
        const { error: featuresError } = await supabase
          .from('program_pages_features')
          .insert(
            program.features.map((feature, index) => ({
              program_id: programData.id,
              title: feature.title,
              icon: feature.icon,
              description: feature.description,
              sort_order: index
            }))
          );

        if (featuresError) throw featuresError;
      }

      toast.success('Test data initialized successfully');
      router.refresh();
    } catch (error) {
      console.error('Error initializing test data:', error);
      toast.error('Failed to initialize test data');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Program Page</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="e.g., General English Program"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="Brief overview of the program (2-3 sentences)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value as 'red' | 'blue' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="blue">Blue - Professional/Academic</option>
              <option value="red">Red - Dynamic/Intensive</option>
            </select>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Introduction</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Introduction Text *
            </label>
            <textarea
              value={formData.introduction.text}
              onChange={(e) => setFormData({
                ...formData,
                introduction: { ...formData.introduction, text: e.target.value }
              })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="Detailed description of the program, its goals, and what students can expect"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Introduction Image
            </label>
            <ImageUploader
              onImageUploaded={(url) => setFormData({
                ...formData,
                introduction: { ...formData.introduction, image: url }
              })}
              currentImageUrl={formData.introduction.image}
              folder="program-images"
              id="intro-image"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why Choose Title
            </label>
            <input
              type="text"
              value={formData.introduction.whyChooseTitle}
              onChange={(e) => setFormData({
                ...formData,
                introduction: { ...formData.introduction, whyChooseTitle: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Why Choose Our Program?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why Choose Text
            </label>
            {formData.introduction.whyChooseText.map((text, index) => (
              <textarea
                key={index}
                value={text}
                onChange={(e) => {
                  const newText = [...formData.introduction.whyChooseText]
                  newText[index] = e.target.value
                  setFormData({
                    ...formData,
                    introduction: { ...formData.introduction, whyChooseText: newText }
                  })
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                placeholder="Key benefits or unique aspects of the program"
              />
            ))}
          </div>
        </div>

        {/* Program Levels */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Program Levels</h2>
            <button
              type="button"
              onClick={handleAddLevel}
              className="inline-flex items-center text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Level
            </button>
          </div>

          {formData.levels.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">No levels added yet</h3>
              <p className="mt-1 text-sm text-gray-500">Click "Add Level" to create your first program level</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddLevel}
                  className="inline-flex items-center text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Your First Level
                </button>
              </div>
            </div>
          )}

          {formData.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900">Level {levelIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newLevels = formData.levels.filter((_, i) => i !== levelIndex)
                    setFormData({ ...formData, levels: newLevels })
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level Title *
                  </label>
                  <input
                    type="text"
                    value={level.title}
                    onChange={(e) => handleLevelChange(levelIndex, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    placeholder={exampleProgramLevel.title}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge (e.g., A1-A2)
                  </label>
                  <input
                    type="text"
                    value={level.badge}
                    onChange={(e) => handleLevelChange(levelIndex, 'badge', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={exampleProgramLevel.badge}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prerequisites
                </label>
                <input
                  type="text"
                  value={level.prerequisites}
                  onChange={(e) => handleLevelChange(levelIndex, 'prerequisites', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={exampleProgramLevel.prerequisites}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={level.description}
                  onChange={(e) => handleLevelChange(levelIndex, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={exampleProgramLevel.description}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Learning Outcomes
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddOutcome(levelIndex)}
                    className="text-sm text-[#2596be] hover:text-[#1a7290]"
                  >
                    + Add Outcome
                  </button>
                </div>
                {level.outcomes.map((outcome, outcomeIndex) => (
                  <input
                    key={outcomeIndex}
                    type="text"
                    value={outcome}
                    onChange={(e) => handleOutcomeChange(levelIndex, outcomeIndex, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                    placeholder={exampleProgramLevel.outcomes[0]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Program Features</h2>
            <button
              type="button"
              onClick={handleAddFeature}
              className="inline-flex items-center text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Feature
            </button>
          </div>

          {formData.features.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">No features added yet</h3>
              <p className="mt-1 text-sm text-gray-500">Click "Add Feature" to highlight program benefits</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
                >
                  View Example Feature
                </button>
              </div>
            </div>
          )}

          {formData.features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-900">Feature {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = formData.features.filter((_, i) => i !== index)
                    setFormData({ ...formData, features: newFeatures })
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {programIcons.map(icon => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label} - {icon.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={exampleProgramFeature.title}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder={exampleProgramFeature.description}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Course Materials */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Course Materials</h2>
            <button
              type="button"
              onClick={handleAddMaterial}
              className="inline-flex items-center text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Material
            </button>
          </div>

          {formData.course_materials.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">No materials added yet</h3>
              <p className="mt-1 text-sm text-gray-500">Click "Add Material" to showcase course resources</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddMaterial}
                  className="text-[#2596be] hover:text-[#1a7290] text-sm font-medium"
                >
                  View Example Material
                </button>
              </div>
            </div>
          )}

          {formData.course_materials.map((material, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-900">Material {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newMaterials = formData.course_materials.filter((_, i) => i !== index)
                    setFormData({ ...formData, course_materials: newMaterials })
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={material.title}
                  onChange={(e) => handleMaterialChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={exampleCourseMaterial.title}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={material.description}
                  onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder={exampleCourseMaterial.description}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <ImageUploader
                  onImageUploaded={(url) => handleMaterialChange(index, 'image', url)}
                  currentImageUrl={material.image}
                  folder="course-materials"
                  id={`course-material-${index}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <input
                  type="text"
                  value={material.level}
                  onChange={(e) => handleMaterialChange(index, 'level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={exampleCourseMaterial.level}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/academics')}
            className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Program
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Initialize Test Data</h2>
        <button
          onClick={initializeTestData}
          disabled={isInitializing}
          className="inline-flex items-center px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290] disabled:opacity-50"
        >
          {isInitializing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Initializing...
            </>
          ) : (
            'Initialize Test Data'
          )}
        </button>
      </div>
    </div>
  )
} 