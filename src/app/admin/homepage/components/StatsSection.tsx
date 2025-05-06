'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getClientComponentClient, getAdminClient } from '@/lib/supabase'
import type { StatItem } from '@/types/content'
import StatsDisplay from '@/components/StatsDisplay'
import { EyeIcon, EyeSlashIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

// Pre-defined SVG icons with descriptive names
const ICON_OPTIONS = [
  { 
    label: 'Academic Cap', 
    value: 'M12 14l9-5-9-5-9 5 9 5z' 
  },
  { 
    label: 'Check Circle', 
    value: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    label: 'Light Bulb', 
    value: 'M12 4.354a4 4 0 110 5.292V12H5.69a4 4 0 110-5.292V4.5a.5.5 0 01.5-.5h6.6a.5.5 0 01.5.5v2.146z' 
  },
  { 
    label: 'Lightning Bolt', 
    value: 'M13 10V3L4 14h7v7l9-11h-7z' 
  },
  { 
    label: 'Star', 
    value: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' 
  },
  {
    label: 'Users', 
    value: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
  },
  {
    label: 'Clock', 
    value: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' 
  }
];

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true) // State for section toggle
  const [sectionSettings, setSectionSettings] = useState({
    is_visible: true,
    title: 'Our Numbers Speak for Themselves'
  })

  useEffect(() => {
    loadStats()
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const supabase = getClientComponentClient()
      const { data, error } = await supabase
        .from('section_settings')
        .select('*')
        .eq('section_name', 'stats')
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Record not found - use defaults and maybe create a record later
          console.log('No settings found for stats section, using defaults')
        } else {
          throw error
        }
      }
      
      if (data) {
        setSectionSettings(data.settings || { is_visible: true, title: 'Our Numbers Speak for Themselves' })
        setIsEnabled(data.settings?.is_visible ?? true)
      }
    } catch (error) {
      console.error('Error loading section settings:', error)
    }
  }

  const loadStats = async () => {
    try {
      const supabase = getClientComponentClient()
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) throw error
      
      if (data && data.length > 0) {
        setStats(data)
      } else {
        // Initialize with some default stats if none exist
        setStats([
          { id: 'default1', name: 'Students Taught', stat: '1000+', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
          { id: 'default2', name: 'Success Rate', stat: '95%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
          { id: 'default3', name: 'Expert Teachers', stat: '20+', icon: 'M12 4.354a4 4 0 110 5.292V12H5.69a4 4 0 110-5.292V4.5a.5.5 0 01.5-.5h6.6a.5.5 0 01.5.5v2.146z' },
          { id: 'default4', name: 'Years Experience', stat: '10', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
        ])
      }
    } catch (error) {
      console.error('Error loading stats:', error)
      toast.error('Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  const handleStatChange = (index: number, field: keyof StatItem, value: string) => {
    const newStats = [...stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setStats(newStats)
  }

  const handleSettingChange = (field: string, value: any) => {
    setSectionSettings({
      ...sectionSettings,
      [field]: value
    })
    
    if (field === 'is_visible') {
      setIsEnabled(value)
    }
  }

  const handleAddStat = () => {
    setStats([
      ...stats, 
      { 
        id: `temp_${Date.now()}`, 
        name: 'New Statistic', 
        stat: '0', 
        icon: ICON_OPTIONS[0].value 
      }
    ])
  }

  const handleRemoveStat = (index: number) => {
    const newStats = [...stats]
    newStats.splice(index, 1)
    setStats(newStats)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const supabase = getAdminClient()

      // Update section settings
      const { error: settingsError } = await supabase
        .from('section_settings')
        .upsert({
          section_name: 'stats',
          settings: {
            ...sectionSettings,
            is_visible: isEnabled
          },
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_name' })
      
      if (settingsError) throw settingsError
      
      // Delete existing stats and insert new ones
      // First, get existing IDs to preserve them if possible
      const { data: existingStats } = await supabase
        .from('stats')
        .select('id')
      
      const existingIds = existingStats?.map(s => s.id) || []
      
      // Prepare stats data for upsert, preserving IDs for existing items
      const statsToSave = stats.map(stat => {
        // For default or temp IDs, remove the ID so the database generates a new one
        if (stat.id && (stat.id.startsWith('default') || stat.id.startsWith('temp_'))) {
          const { id, ...rest } = stat
          return rest
        }
        return stat
      })
      
      // Remove all existing stats
      if (existingIds.length > 0) {
        const { error: deleteError } = await supabase
          .from('stats')
          .delete()
          .in('id', existingIds)
        
        if (deleteError) throw deleteError
      }
      
      // Insert new stats
      const { error: insertError } = await supabase
        .from('stats')
        .insert(statsToSave)
      
      if (insertError) throw insertError
      
      toast.success('Statistics updated successfully')
      loadStats() // Reload to get the proper IDs
    } catch (error) {
      console.error('Error saving stats:', error)
      toast.error('Failed to save statistics: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse bg-gray-100 rounded-lg h-96"></div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Stats Section</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              {isEnabled ? 'Visible on site' : 'Hidden from site'}
            </span>
            <button
              type="button"
              onClick={() => handleSettingChange('is_visible', !isEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
              {isEnabled ? 
                <EyeIcon className="absolute left-1 h-4 w-4 text-white" /> : 
                <EyeSlashIcon className="absolute right-1 h-4 w-4 text-gray-500" />
              }
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={sectionSettings.title}
            onChange={(e) => handleSettingChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Our Numbers Speak for Themselves"
          />
        </div>
        
        <h3 className="text-lg font-medium mb-4">Statistics Section Content</h3>
        
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <h4 className="font-medium text-gray-900">Statistic {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveStat(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statistic Name
                  </label>
                  <input
                    type="text"
                    value={stat.name}
                    onChange={(e) => handleStatChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    placeholder="Students Taught"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    value={stat.stat}
                    onChange={(e) => handleStatChange(index, 'stat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    placeholder="1000+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={stat.icon}
                    onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon.label} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 p-2 border border-gray-200 rounded bg-gray-50 flex justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddStat}
            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Another Statistic
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {isEnabled && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Preview</h2>
          <h3 className="text-xl text-center font-bold mb-10 text-gray-800">{sectionSettings.title}</h3>
          <StatsDisplay stats={stats} />
        </div>
      )}
    </form>
  )
} 