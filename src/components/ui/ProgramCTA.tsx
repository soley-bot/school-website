import React from 'react';

interface ProgramCTAProps {
  title?: string;
  description?: string;
}

export default function ProgramCTA({ 
  title = "Ready to Start?",
  description = "Contact us to schedule a placement test and begin your learning journey. Our team is ready to answer any questions and help you find the perfect program for your needs."
}: ProgramCTAProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">{description}</p>
        <a
          href="/contact"
          className="inline-block bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg
                   hover:bg-indigo-700 transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
} 