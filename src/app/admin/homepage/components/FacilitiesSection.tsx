'use client'

import { useState, useEffect } from 'react'
import { getClientComponentClient, getAdminClient } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { PlusIcon, TrashIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { v4 as uuidv4 } from 'uuid'

interface Facility {
  id: number
  title: string
  description: string
  image_url: string | null
}

export default function FacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadFacilities()
  }, [])

  async function loadFacilities() {
    try {
      const supabase = getClientComponentClient()
      
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setFacilities(data || [])
    } catch (error) {
      console.error('Error loading facilities:', error)
      toast.error('Failed to load facilities')
    }
  }

  async function handleImageUpload(file: File) {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file')
      }

      const supabase = getAdminClient()

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${uuidv4()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('facilities')
        .upload(fileName, file, {
          contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`
        })

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        throw uploadError
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/facilities/${fileName}`
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editingFacility) return

    setIsSaving(true)
    try {
      const supabase = getAdminClient()
      
      let imageUrl = editingFacility.image_url

      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage)
      }

      if (!imageUrl && !editingFacility.id) {
        toast.error('Please upload an image')
        setIsSaving(false)
        return
      }

      const facilityData = {
        title: editingFacility.title,
        description: editingFacility.description,
        image_url: imageUrl
      }

      if (editingFacility.id) {
        const { error } = await supabase
          .from('facilities')
          .update(facilityData)
          .eq('id', editingFacility.id)

        if (error) {
          console.error("Error updating facility:", error)
          throw error
        }
        toast.success('Facility updated successfully')
      } else {
        const { error } = await supabase
          .from('facilities')
          .insert([facilityData])

        if (error) {
          console.error("Error creating facility:", error)
          throw error
        }
        toast.success('Facility created successfully')
      }

      setIsEditing(false)
      setEditingFacility(null)
      setSelectedImage(null)
      loadFacilities()
    } catch (error) {
      console.error('Error saving facility:', error)
      toast.error('Error saving facility: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      const supabase = getAdminClient()
      
      const facility = facilities.find(f => f.id === id)
      if (!facility) return

      if (facility.image_url) {
        const fileName = facility.image_url.split('/').pop()
        if (fileName) {
          const { error: deleteStorageError } = await supabase.storage
            .from('facilities')
            .remove([fileName])

          if (deleteStorageError) throw deleteStorageError
        }
      }

      const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Facility deleted successfully')
      loadFacilities()
    } catch (error) {
      console.error('Error deleting facility:', error)
      toast.error('Failed to delete facility')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Facilities</h2>
        <button
          onClick={() => {
            setEditingFacility({
              id: 0,
              title: '',
              description: '',
              image_url: null
            })
            setIsEditing(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#2596be] text-white rounded-md hover:bg-[#1a7290]"
        >
          <PlusIcon className="h-5 w-5" />
          Add Facility
        </button>
      </div>

      {isEditing && editingFacility ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={editingFacility.title}
              onChange={(e) => setEditingFacility({ ...editingFacility, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={editingFacility.description}
              onChange={(e) => setEditingFacility({ ...editingFacility, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter facility description (press Enter for new lines)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image {!editingFacility.id && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="w-full"
              required={!editingFacility.id && !editingFacility.image_url}
            />
            {editingFacility.image_url && !selectedImage && (
              <div className="mt-2">
                <Image
                  src={editingFacility.image_url}
                  alt={editingFacility.title}
                  width={200}
                  height={150}
                  className="rounded-md"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/schoolbuildingplaceholder.jpg';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290] disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setEditingFacility(null)
                setSelectedImage(null)
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div key={facility.id} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                {facility.image_url ? (
                  <Image
                    src={facility.image_url}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/schoolbuildingplaceholder.jpg';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
                <p className="text-gray-600 mb-4 whitespace-pre-line">{facility.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingFacility(facility)
                      setIsEditing(true)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(facility.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 