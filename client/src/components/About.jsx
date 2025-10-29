import React from 'react';

const About = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About FocusFlow</h1>
        <p className="text-gray-600 dark:text-gray-300">A clean, modern productivity app built as a portfolio project</p>
      </div>

      {/* Project Overview */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          FocusFlow is a full-stack productivity application built to demonstrate modern web development skills. 
          It combines a clean, intuitive interface with powerful features for task management and focus tracking.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          This project showcases proficiency in React, Node.js, MongoDB, and modern UI/UX design principles.
        </p>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Pomodoro-style focus timer</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Task management with tags</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Progress tracking and analytics</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Dark mode support</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Responsive design</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">PWA capabilities</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Real-time data updates</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">Secure authentication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Frontend</h3>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-300">React 18</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tailwind CSS</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Chart.js</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Vite</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Backend</h3>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-300">Node.js</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Express.js</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">MongoDB</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">JWT Auth</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tools & Services</h3>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-300">Git & GitHub</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">OpenAI API</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">PWA</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Responsive Design</div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Process */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Development Process</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Planning & Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Created wireframes and user flow diagrams to plan the application structure and user experience.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Backend Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Built RESTful API with Express.js, implemented authentication, and designed MongoDB schemas.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Frontend Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Created responsive React components with Tailwind CSS and integrated Chart.js for data visualization.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">4</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Testing & Optimization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Tested across different devices, optimized performance, and implemented PWA features.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Links</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://github.com/yourusername/focusflow" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            View Source Code
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
