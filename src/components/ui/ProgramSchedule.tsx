import React from 'react'

interface ScheduleTime {
  morning?: string[]
  afternoon?: string[]
  evening?: string[]
  weekend?: {
    saturday?: string
    sunday?: string
    general?: string
  }
}

interface TuitionLevel {
  price: number
  levels: string[]
}

interface ProgramScheduleProps {
  isAdult?: boolean
  scheduleTime: ScheduleTime
  tuitionFees: TuitionLevel[]
  programType: 'english' | 'chinese'
}

const defaultSchedule: ScheduleTime = {
  morning: [],
  afternoon: [],
  evening: [],
  weekend: {
    saturday: '',
    sunday: '',
    general: ''
  }
}

export default function ProgramSchedule({
  isAdult = false,
  scheduleTime = defaultSchedule,
  tuitionFees = [],
  programType,
}: ProgramScheduleProps) {
  const flagSrc = programType === 'english' ? '🇺🇸' : '🇨🇳'
  const schedule = { ...defaultSchedule, ...scheduleTime }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Schedule</h3>
          <span className="text-2xl">{flagSrc}</span>
        </div>
        <div className="space-y-4">
          {schedule.morning && schedule.morning.length > 0 && (
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Morning</span>
              <span className="text-gray-600">{schedule.morning.join(' | ')}</span>
            </div>
          )}
          {schedule.afternoon && schedule.afternoon.length > 0 && (
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Afternoon</span>
              <span className="text-gray-600">{schedule.afternoon.join(' | ')}</span>
            </div>
          )}
          {schedule.evening && schedule.evening.length > 0 && (
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Evening</span>
              <span className="text-gray-600">{schedule.evening.join(' | ')}</span>
            </div>
          )}
          {schedule.weekend && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Weekends</h4>
              {schedule.weekend.saturday && (
                <div className="flex items-center mb-2">
                  <span className="w-32 font-semibold text-gray-700">Saturday</span>
                  <span className="text-gray-600">{schedule.weekend.saturday}</span>
                </div>
              )}
              {schedule.weekend.sunday && (
                <div className="flex items-center">
                  <span className="w-32 font-semibold text-gray-700">Sunday</span>
                  <span className="text-gray-600">{schedule.weekend.sunday}</span>
                </div>
              )}
              {schedule.weekend.general && (
                <div className="flex items-center">
                  <span className="w-32 font-semibold text-gray-700">Weekend</span>
                  <span className="text-gray-600">{schedule.weekend.general}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Tuition Fees</h3>
        <div className="space-y-3">
          {tuitionFees.map((fee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <span className="font-semibold text-gray-900">USD {fee.price}</span>
                <span className="text-gray-600 ml-2">/ level</span>
              </div>
              <div className="flex-1 text-right text-gray-600">{fee.levels.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 