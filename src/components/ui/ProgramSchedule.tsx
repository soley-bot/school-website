import React from 'react';

interface ScheduleOption {
  title: string;
  time: string;
  days: string;
  features: string[];
}

interface ProgramScheduleProps {
  scheduleOptions: ScheduleOption[];
}

export default function ProgramSchedule({ scheduleOptions }: ProgramScheduleProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-indigo-800 font-semibold mb-2">Class Options</h3>
          <h2 className="text-3xl font-bold mb-4">Flexible Schedule Options</h2>
          <p className="text-gray-600">Choose the schedule that best fits your lifestyle and learning preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scheduleOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-indigo-800 text-white p-6 text-center">
                <h3 className="text-xl font-bold">{option.title}</h3>
              </div>
              
              <div className="p-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">{option.time}</div>
                <div className="text-gray-600 mb-6">{option.days}</div>

                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-indigo-800 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <a
                    href="/contact"
                    className="inline-block bg-indigo-800 text-white font-semibold px-6 py-3 rounded-lg
                             hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Reserve Your Spot
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 