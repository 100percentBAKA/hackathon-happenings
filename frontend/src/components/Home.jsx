import React from 'react'

export default function Home({isDarkMode}) {
  return (
    <>
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>

     <div className="min-h-screen">

      <main className="container mx-auto py-12 px-6 md:px-12 lg:px-24">
        <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">Our Mission</h2>
          <p className="text-lg text-gray-700">
            To revolutionize visual advertising by providing brands with an intelligent, 
            scalable platform that generates high-quality, personalized campaign posters at 
            unprecedented volumes, driving engagement and brand recognition across various mediums.
          </p>
        </section>

        <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">Our Vision</h2>
          <p className="text-lg text-gray-700">
            To be the leading solution for brands seeking to create impactful, data-driven 
            poster campaigns that resonate with their target audience across all physical and digital platforms.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">Current Trends We Leverage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-500">AI-Powered Design Generation</h3>
              <p className="text-gray-700">Utilize advanced algorithms to create visually stunning poster designs tailored to brand guidelines and campaign objectives.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-500">Dynamic Content Personalization</h3>
              <p className="text-gray-700">Generate posters with personalized elements based on target demographics, locations, or individual consumer data.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-500">Multi-Format Optimization</h3>
              <p className="text-gray-700">Automatically adapt poster designs for various formats including digital displays, print media, and social media platforms.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-500">Real-Time Campaign Insights</h3>
              <p className="text-gray-700">Provide analytics on poster performance, allowing for rapid iteration and optimization of designs based on audience engagement.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">Why Choose AdGenius?</h2>
          <ul className="list-disc list-inside text-lg space-y-2 text-gray-700">
            <li>Unparalleled high-volume poster generation capability</li>
            <li>Cutting-edge AI technology for creative and personalized designs</li>
            <li>Seamless integration with major advertising platforms and print services</li>
            <li>Data-driven insights for continuous campaign improvement</li>
            <li>Cost-effective solution for large-scale poster campaigns</li>
            <li>Consistent brand representation across all generated posters</li>
          </ul>
        </section>
      </main>
    </div>
    </div>
    </>
    )
}
