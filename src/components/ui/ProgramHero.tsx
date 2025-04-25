import React from 'react';

interface ProgramHeroProps {
  title: string;
  description: string;
  theme?: 'red' | 'blue';
}

export default function ProgramHero({ title, description, theme = 'blue' }: ProgramHeroProps) {
  const bgGradient = theme === 'red' 
    ? 'from-[#e11d48] to-[#be123c]'
    : 'from-[#2596be] to-[#1a7290]';

  const buttonColor = theme === 'red' ? 'text-[#e11d48]' : 'text-[#2596be]';

  return (
    <section className={`relative bg-gradient-to-r ${bgGradient} text-white py-20`}>
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">{description}</p>
        <a 
          href="#program-details" 
          className={`inline-block bg-white ${buttonColor} font-semibold px-8 py-3 rounded-lg 
                   hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1`}
        >
          Explore Program
        </a>
      </div>
    </section>
  );
} 