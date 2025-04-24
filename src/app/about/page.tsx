import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2596be] to-[#1a7290] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our School</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover our rich history, mission, and the values that guide our approach to language education
          </p>
        </div>
      </section>

      {/* About Intro Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[#2596be] text-xl font-semibold mb-2">About Our School</h2>
          <h3 className="text-4xl font-bold mb-6">Excellence in Education Since 1985</h3>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Stanford AS Language School is committed to providing a comprehensive education that nurtures academic excellence, personal growth, and character development. For over three decades, we have been at the forefront of language education, combining innovative teaching methodologies with a deep respect for cultural understanding.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To provide an innovative and inspiring learning environment that empowers students to achieve academic excellence and develop into responsible global citizens.
              </p>
              <p className="text-gray-600 mb-2">We accomplish this through:</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Immersive language programs</li>
                <li>Cultural exchange opportunities</li>
                <li>Personalized learning approaches</li>
                <li>Community engagement initiatives</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To be recognized as a leading educational institution that prepares students for success in an ever-changing global society.
              </p>
              <p className="text-gray-600 mb-2">We envision:</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Graduates who are fluent in multiple languages</li>
                <li>Alumni who serve as cultural ambassadors</li>
                <li>A school community that embraces diversity</li>
                <li>Educational practices that adapt to global changes</li>
              </ul>
            </div>

            {/* Values */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-blue-600 font-semibold mb-1">Excellence</h4>
                  <p className="text-gray-600">We pursue the highest standards in all aspects of education and administration.</p>
                </div>
                <div>
                  <h4 className="text-blue-600 font-semibold mb-1">Integrity</h4>
                  <p className="text-gray-600">We act with honesty, transparency, and ethical behavior in all interactions.</p>
                </div>
                <div>
                  <h4 className="text-blue-600 font-semibold mb-1">Innovation</h4>
                  <p className="text-gray-600">We embrace new ideas and approaches to enhance the learning experience.</p>
                </div>
                <div>
                  <h4 className="text-blue-600 font-semibold mb-1">Inclusivity</h4>
                  <p className="text-gray-600">We welcome and respect diverse perspectives, cultures, and backgrounds.</p>
                </div>
                <div>
                  <h4 className="text-blue-600 font-semibold mb-1">Community</h4>
                  <p className="text-gray-600">We foster a supportive environment where everyone contributes to collective success.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Faculty Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/faculty/sarah-johnson.jpg"
                  alt="Dr. Sarah Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Sarah Johnson</h3>
                <h4 className="text-blue-600 font-medium mb-2">Director</h4>
                <p className="text-gray-600">Ph.D. in Linguistics with over 20 years of experience in language education and curriculum development.</p>
              </div>
            </div>

            {/* Faculty Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/faculty/carlos-mendez.jpg"
                  alt="Prof. Carlos Mendez"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Prof. Carlos Mendez</h3>
                <h4 className="text-blue-600 font-medium mb-2">Academic Dean</h4>
                <p className="text-gray-600">Specialist in Romance languages with expertise in immersive teaching methodologies and cross-cultural communication.</p>
              </div>
            </div>

            {/* Faculty Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/faculty/akiko-tanaka.jpg"
                  alt="Dr. Akiko Tanaka"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Akiko Tanaka</h3>
                <h4 className="text-blue-600 font-medium mb-2">Head of Asian Languages</h4>
                <p className="text-gray-600">Expert in East Asian languages with research focus on technology-assisted language acquisition.</p>
              </div>
            </div>

            {/* Faculty Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/faculty/robert-klein.jpg"
                  alt="Dr. Robert Klein"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Robert Klein</h3>
                <h4 className="text-blue-600 font-medium mb-2">Director of European Languages</h4>
                <p className="text-gray-600">Specializes in Germanic and Slavic languages with extensive experience in developing cultural immersion programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Facility Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/facilities/language-lab.jpg"
                  alt="State-of-the-art Language Labs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">State-of-the-art Language Labs</h3>
                <p className="text-gray-600">Our digital language laboratories feature advanced audio-visual equipment, recording facilities, and interactive software to enhance language acquisition.</p>
              </div>
            </div>

            {/* Facility Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/facilities/cultural-space.jpg"
                  alt="Cultural Immersion Spaces"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Cultural Immersion Spaces</h3>
                <p className="text-gray-600">Dedicated areas designed to replicate authentic cultural environments where students can practice language skills in realistic contexts.</p>
              </div>
            </div>

            {/* Facility Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/facilities/resource-center.jpg"
                  alt="Multimedia Resource Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Multimedia Resource Center</h3>
                <p className="text-gray-600">A comprehensive collection of books, films, music, and digital resources in multiple languages to support student learning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Teaching Methodology</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-3">Immersive Learning Approach</h3>
                <p className="text-gray-600">Our teaching philosophy is built on the principle that language is best acquired through immersion and practical application. We create environments where students are surrounded by the target language and engage with it in meaningful contexts.</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-3">Communicative Competence</h3>
                <p className="text-gray-600">Rather than focusing solely on grammar rules, our approach emphasizes building communicative competence—the ability to use language effectively in real-world situations. Students develop listening, speaking, reading, and writing skills in balanced proportion.</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-3">Cultural Integration</h3>
                <p className="text-gray-600">We believe language cannot be separated from culture. Our curriculum integrates cultural understanding, traditions, history, and contemporary issues of the regions where each language is spoken.</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-3">Personalized Learning Paths</h3>
                <p className="text-gray-600">We recognize that each student learns differently. Our adaptive learning systems allow for personalized learning paths that respond to individual strengths, challenges, and learning styles.</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-3">Assessment and Progress</h3>
                <p className="text-gray-600">Our assessment approach focuses on practical language use across multiple contexts. We measure progress through ongoing evaluation rather than relying solely on traditional testing.</p>
              </div>
            </div>
            
            <div className="relative h-[600px]">
              <Image
                src="/images/methodology.jpg"
                alt="Students in an immersive learning environment"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 