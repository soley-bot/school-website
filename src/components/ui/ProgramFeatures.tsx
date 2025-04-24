import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProgramFeaturesProps {
  features: Feature[];
}

export default function ProgramFeatures({ features }: ProgramFeaturesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-indigo-800 font-semibold mb-2">Program Features</h3>
          <h2 className="text-3xl font-bold">Why Choose Our Program</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow 
                         duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-8 h-8 text-indigo-800">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 