import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaChartLine, FaCog, FaGlobe, FaMobile, FaUsers, FaBrain, FaRocket } from 'react-icons/fa';
import { Container } from './ui/Container';
import { PageHeader } from './ui/PageHeader';
import { Button } from './ui/Button';

export default function Services() {
  const services = [
    {
      id: "design",
      icon: <FaPaintBrush className="w-8 h-8" />,
      title: "AI Design Studio",
      description: "Create stunning ad designs instantly with our AI-powered design engine. Perfect for any platform or format.",
      features: ["Custom brand adaptation", "Multi-format generation", "Smart layout optimization"],
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "analyze",
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Get deep insights into your campaign performance with real-time analytics and AI-driven recommendations.",
      features: ["Real-time tracking", "Performance predictions", "Audience insights"],
      color: "from-green-500 to-teal-500"
    },
    {
      id: "optimize",
      icon: <FaBrain className="w-8 h-8" />,
      title: "AI Optimization",
      description: "Let our AI continuously optimize your campaigns for maximum impact and ROI.",
      features: ["A/B testing", "Dynamic optimization", "Performance tracking"],
      color: "from-orange-500 to-red-500"
    },
    {
      id: "distribute",
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Distribution",
      description: "Deploy your campaigns across multiple platforms and regions with intelligent localization.",
      features: ["Multi-channel deployment", "Local adaptation", "Schedule optimization"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      quote: "AdGenius has transformed how we approach advertising. The AI-powered designs are incredible.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc."
    },
    {
      quote: "The speed and quality of ad generation is unprecedented. It's like having a design team available 24/7.",
      author: "Michael Chen",
      role: "CEO",
      company: "Global Brands"
    }
  ];

  return (
    <Container className="py-20">
      <PageHeader
        title="Our Services"
        description="Discover how AdGenius can transform your advertising campaigns with AI-powered solutions"
      />
      
      {/* Main Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {services.map((service, index) => (
          <ServiceCard key={service.id} {...service} index={index} />
        ))}
      </div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="text-gray-600 italic mb-4">"{testimonial.quote}"</div>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
              <div className="text-sm text-gray-500">{testimonial.company}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">Transform your advertising strategy today with AdGenius</p>
        <Link to="/services/design">
          <Button size="lg">Start Your First Campaign</Button>
        </Link>
      </motion.div>
    </Container>
  );
}

const ServiceCard = ({ id, icon, title, description, features, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`${id}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className={`p-6 bg-gradient-to-r ${color}`}>
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center text-white mb-4">
              {icon}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-500">
                  <FaRocket className="w-4 h-4 mr-2 text-blue-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};