import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiTrendingUp, FiZap, FiGlobe, FiUsers, FiAward } from 'react-icons/fi';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export default function Home({ isDarkMode }) {
  const features = [
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: 'Precision Targeting',
      description: 'Reach your ideal audience with AI-powered demographic targeting and behavioral analysis'
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: 'Performance Analytics',
      description: 'Track campaign performance with real-time analytics and detailed insights'
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Instant Generation',
      description: 'Create compelling ad designs in seconds with our advanced AI engine'
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: 'Global Reach',
      description: 'Deploy campaigns across multiple regions with localized content optimization'
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Smart Audience Insights',
      description: 'Understand your audience better with AI-powered behavioral analysis'
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: 'Brand Consistency',
      description: 'Maintain brand identity across all campaigns with smart design systems'
    }
  ];

  const stats = [
    { number: '-', label: 'Global Brands' },
    { number: '-', label: 'Ads Generated' },
    { number: '-', label: 'Countries Served' },
    { number: '-', label: 'Client Satisfaction' }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      <div className="home-wrapper">
        <div className={`content-overlay ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <Container>
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-h-screen flex flex-col justify-center py-20"
            >
              <div className="text-center max-w-4xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                  Transform Your Advertising with AI
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl mb-8 text-200"
                >
                  Create stunning, personalized ad campaigns at scale with our advanced AI technology
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-x-4"
                >
                  <Link to="/services/design">
                    <Button size="lg" className="mr-4">
                      Start Creating
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="py-12"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-300 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Section */}
            <div className="py-20">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              >
                Why Choose AdGenius?
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors duration-300"
                  >
                    <div className="inline-block p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ready to Transform Your Advertising?
              </h2>
              <p className="text-xl text-300 mb-8">
                Join thousands of brands already using AdGenius to revolutionize their campaigns
              </p>
              <Link to="/services/design">
                <Button size="lg">Get Started Now</Button>
              </Link>
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
}