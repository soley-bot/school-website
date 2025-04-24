'use client'

import { useState } from 'react'
import Link from 'next/link'

const initialPrograms = [
  {
    id: 'chinese-primary',
    name: 'Chinese Primary',
    description: 'Foundation Chinese language program for primary school students',
    level: 'Primary',
  },
  {
    id: 'general-chinese',
    name: 'General Chinese',
    description: 'Comprehensive Chinese language program for all levels',
    level: 'All Levels',
  },
  {
    id: 'general-english',
    name: 'General English',
    description: 'English language program for all proficiency levels',
    level: 'All Levels',
  },
  {
    id: 'ielts-preparation',
    name: 'IELTS Preparation',
    description: 'Specialized program for IELTS exam preparation',
    level: 'Advanced',
  },
]

export default function AcademicsManagement() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    // TODO: Implement save logic
    setEditingId(null)
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Programs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your academic programs and courses
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Program
          </button>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Program Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Level
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {programs.map((program) => (
                      <tr key={program.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {program.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">{program.description}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{program.level}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleEdit(program.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <Link
                            href={`/admin/academics/${program.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 