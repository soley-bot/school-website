import React from 'react';

interface ProgramLevel {
  title: string;
  badge: string;
  duration: string;
  weeklyHours: string;
  prerequisites: string;
  description: string;
  outcomes: string[];
}

interface ProgramDetailsProps {
  levels: ProgramLevel[];
}

export default function ProgramDetails({ levels }: ProgramDetailsProps) {
  return (
    <section className="py-16" id="program-details">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-indigo-800 font-semibold mb-2">Program Details</h3>
          <h2 className="text-3xl font-bold">Course Structure and Information</h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {levels.map((level, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold">{level.title}</h3>
                  <span className="ml-4 px-3 py-1 bg-indigo-800 text-white text-sm font-semibold rounded-full">
                    {level.badge}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <span className="text-gray-600 text-sm">Duration</span>
                  <p className="font-semibold">{level.duration}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Weekly Hours</span>
                  <p className="font-semibold">{level.weeklyHours}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Prerequisites</span>
                  <p className="font-semibold">{level.prerequisites}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{level.description}</p>

              <div>
                <h4 className="text-lg font-semibold text-indigo-800 mb-4">Learning Outcomes</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {level.outcomes.map((outcome, i) => (
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
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 