'use client'

import { useState, useEffect } from 'react'
import { getClientComponentClient, getAdminClient } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { PlusIcon, TrashIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { v4 as uuidv4 } from 'uuid'

interface Event {
  id: number
  title: string
  description: string
  date: string
  image_url: string | null
}

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      const supabase = getClientComponentClient()
      
      const { data, error } = await supabase
        .from('upcoming_events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error loading events:', error)
      toast.error('Failed to load events')
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
        .from('events')
        .upload(fileName, file, {
          contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`
        })

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        throw uploadError
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events/${fileName}`
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editingEvent) return

    setIsSaving(true)
    try {
      const supabase = getAdminClient()
      
      let imageUrl = editingEvent.image_url

      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage)
      }

      const eventData = {
        title: editingEvent.title,
        description: editingEvent.description,
        date: editingEvent.date,
        image_url: imageUrl
      }

      if (editingEvent.id) {
        const { error } = await supabase
          .from('upcoming_events')
          .update(eventData)
          .eq('id', editingEvent.id)

        if (error) {
          console.error("Error updating event:", error)
          throw error
        }
        toast.success('Event updated successfully')
      } else {
        const { error } = await supabase
          .from('upcoming_events')
          .insert([eventData])

        if (error) {
          console.error("Error creating event:", error)
          throw error
        }
        toast.success('Event created successfully')
      }

      setIsEditing(false)
      setEditingEvent(null)
      setSelectedImage(null)
      loadEvents()
    } catch (error) {
      console.error('Error saving event:', error)
      toast.error('Error saving event: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      const supabase = getAdminClient()
      
      const event = events.find(e => e.id === id)
      if (!event) return

      if (event.image_url) {
        const fileName = event.image_url.split('/').pop()
        if (fileName) {
          const { error: deleteStorageError } = await supabase.storage
            .from('events')
            .remove([fileName])

          if (deleteStorageError) throw deleteStorageError
        }
      }

      const { error } = await supabase
        .from('upcoming_events')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Event deleted successfully')
      loadEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <button
          onClick={() => {
            setEditingEvent({
              id: 0,
              title: '',
              description: '',
              date: new Date().toISOString().split('T')[0],
              image_url: null
            })
            setIsEditing(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#2596be] text-white rounded-md hover:bg-[#1a7290]"
        >
          <PlusIcon className="h-5 w-5" />
          Add Event
        </button>
      </div>

      {isEditing && editingEvent ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={editingEvent.title}
              onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={editingEvent.description}
              onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter event description (press Enter for new lines)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={editingEvent.date}
              onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="w-full"
            />
            {editingEvent.image_url && !selectedImage && (
              <div className="mt-2">
                <Image
                  src={editingEvent.image_url}
                  alt={editingEvent.title}
                  width={200}
                  height={150}
                  className="rounded-md"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/studentsplaceholder.jpg';
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
                setEditingEvent(null)
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
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                {event.image_url ? (
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/studentsplaceholder.jpg';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2 whitespace-pre-line">{event.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingEvent(event)
                      setIsEditing(true)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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