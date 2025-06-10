import type { WhyChooseUsContent } from '@/types/content'

interface Props {
  content: WhyChooseUsContent
}

export default function WhyChooseUsSection({ content }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            {content.title}
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#2596be]"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index: number) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group border border-gray-100"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#2596be]/5 rounded-bl-[100px] transition-all duration-300 group-hover:bg-[#2596be]/10"></div>
              
              <div className="relative z-10">
                <div className="text-[#2596be] mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-[#2596be]/10">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 