import React from 'react';

interface ProgramCTAProps {
  title?: string;
  description?: string;
  theme?: 'red' | 'blue';
}

export default function ProgramCTA({ 
  title = "Ready to Start?",
  description = "Contact us to schedule a placement test and begin your learning journey. Our team is ready to answer any questions and help you find the perfect program for your needs.",
  theme = 'blue'
}: ProgramCTAProps) {
  const bgGradient = theme === 'red' 
    ? 'from-[#e11d48] to-[#be123c]'
    : 'from-[#2596be] to-[#1a7290]';

  return (
    <section className={`py-16 bg-gradient-to-r ${bgGradient} text-white`}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">{description}</p>
        <a
          href="/contact"
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg
                   hover:bg-opacity-90 transition-all duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
} 