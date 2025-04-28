import React from 'react'

interface ScheduleTime {
  morning: string
  afternoon: string
  evening: string
}

interface Duration {
  weekday: {
    hours: number
    minutes: number
  }
  weekend: {
    hours: number
    minutes: number
  }
}

interface ProgramScheduleProps {
  isAdult?: boolean
  scheduleTime: ScheduleTime
  duration: Duration
  tuitionFees: TuitionLevel[]
  programType: 'english' | 'chinese'
}

interface TuitionLevel {
  price: number
  levels: string[]
}

const defaultSchedule: ScheduleTime = {
  morning: '',
  afternoon: '',
  evening: ''
}

const defaultDuration: Duration = {
  weekday: { hours: 0, minutes: 0 },
  weekend: { hours: 0, minutes: 0 }
}

export default function ProgramSchedule({
  isAdult = false,
  scheduleTime = defaultSchedule,
  duration = defaultDuration,
  tuitionFees = [],
  programType,
}: ProgramScheduleProps) {
  const flagSrc = programType === 'english' ? '🇺🇸' : '🇨🇳'
  const schedule = { ...defaultSchedule, ...scheduleTime }

  const formatDuration = (hours: number, minutes: number) => {
    const parts = []
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
    return parts.join(' and ')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Schedule</h3>
          <span className="text-2xl">{flagSrc}</span>
        </div>
        <div className="space-y-4">
          {schedule.morning && (
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Morning</span>
              <span className="text-gray-600">{schedule.morning}</span>
            </div>
          )}
          {schedule.afternoon && (
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Afternoon</span>
              <span className="text-gray-600">{schedule.afternoon}</span>
            </div>
          )}
          {schedule.evening && (
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Evening</span>
              <span className="text-gray-600">{schedule.evening}</span>
            </div>
          )}
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Duration</h4>
            <div className="flex items-center mb-2">
              <span className="w-32 font-semibold text-gray-700">Weekday</span>
              <span className="text-gray-600">
                {formatDuration(duration.weekday.hours, duration.weekday.minutes)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-semibold text-gray-700">Weekend</span>
              <span className="text-gray-600">
                {formatDuration(duration.weekend.hours, duration.weekend.minutes)}
              </span>
            </div>
          </div>
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