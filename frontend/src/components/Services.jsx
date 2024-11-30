import React from 'react'
import { FaPaintBrush, FaChartLine, FaCog, FaGlobe, FaMobile, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Services() {
    const services = [
        {
          id:"design",
          icon: <FaPaintBrush />,
          title: "Custom Design Generation",
          description: "AI-powered creation of unique poster designs tailored to your brand."
        },
        {
          id:"analyze",
          icon: <FaChartLine />,
          title: "Campaign Analytics",
          description: "Real-time insights and performance tracking for your poster campaigns."
        },
        {
          id:"optimize",
          icon: <FaCog />,
          title: "Automated Optimization",
          description: "Continuous improvement of designs based on performance data."
        },
        {
          id:"distribute",
          icon: <FaGlobe />,
          title: "Multi-Platform Distribution",
          description: "Seamless deployment of posters across various digital and physical channels."
        },
        {
          id:"responsive-design",
          icon: <FaMobile />,
          title: "Responsive Designs",
          description: "Posters optimized for viewing on all device types and sizes."
        },
        {
          id:"audience",
          icon: <FaUsers />,
          title: "Audience Targeting",
          description: "Personalized poster content based on demographic and behavioral data."
        }
      ];
    
      return (
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 text-blue-600">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceTile key={index} {...service} />
              ))}
            </div>
          </div>
        </section>
      );
}

const ServiceTile = ({id, icon, title, description }) => (
    <Link to={`${id}`}>
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
    <div className="text-blue-500 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
    </div>
    </Link>
);
