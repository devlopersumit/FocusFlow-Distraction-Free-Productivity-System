import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: "⏱️",
      title: "Focus Timer",
      description: "Simple Pomodoro-style timer to help you stay focused on your tasks."
    },
    {
      icon: "📝",
      title: "Task Management",
      description: "Clean task list with tags, priorities, and completion tracking."
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Visual charts showing your focus time and productivity patterns."
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description: "Easy on the eyes with a beautiful dark theme option."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices."
    },
    {
      icon: "⚡",
      title: "Fast & Lightweight",
      description: "Built with modern web technologies for optimal performance."
    }
  ];

  const techStack = [
    {
      name: "Frontend",
      technologies: ["React", "Tailwind CSS", "Chart.js", "Vite"],
      description: "Modern React app with beautiful UI components"
    },
    {
      name: "Backend",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      description: "RESTful API with secure authentication"
    },
    {
      name: "Features",
      technologies: ["PWA", "Dark Mode", "Responsive", "Real-time"],
      description: "Progressive web app with modern features"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`${isDark ? 'bg-dark-800' : 'bg-white'} shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/favicon.svg" alt="FocusFlow" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">FocusFlow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Login</Link>
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">Sign Up</Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-600 dark:text-gray-300">Features</a>
              <Link to="/login" className="block py-2 text-gray-600 dark:text-gray-300">Login</Link>
              <Link to="/signup" className="block py-2 text-indigo-600 dark:text-indigo-400">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Focus Better, 
            <span className="text-indigo-600 dark:text-indigo-400"> Build More</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A clean, distraction-free productivity app built with React and Node.js. 
            Track your focus sessions, manage tasks, and stay productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              className="border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features designed to help you focus, collaborate, and achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Open-source, minimal, and focused on helping people be productive.</p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors">Sign Up</Link>
            <Link to="/login" className="border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors">Log In</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/favicon.svg" alt="FocusFlow" className="h-6 w-6" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">FocusFlow</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                A clean, modern productivity app built with React and Node.js.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Project</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="https://github.com/yourusername/focusflow" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Developer</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/yourusername" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">LinkedIn</a></li>
                <li><a href="mailto:your.email@example.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div />
          </div>
          
          <div className="border-t border-gray-200 dark:border-dark-700 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 FocusFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
