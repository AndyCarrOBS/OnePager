'use client';

import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [debugOptions, setDebugOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Set data-page attribute for CSS override
    document.documentElement.setAttribute('data-page', 'admin');
    document.body.setAttribute('data-page', 'admin');
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      setLoading(false);
      // Set some default values for demo
      setDebugOptions({
        boarders: true,
        gridLines: false,
        highlightElements: true,
        performanceMode: false,
        darkMode: false,
        showMetrics: true,
        debugLogs: false
      });
    }, 1000);

    // Cleanup function
    return () => {
      document.documentElement.removeAttribute('data-page');
      document.body.removeAttribute('data-page');
    };
  }, []);

  const handleToggleChange = async (option, newValue) => {
    try {
      // For demo purposes, just update local state
      setDebugOptions(prev => ({
        ...prev,
        [option]: newValue
      }));
      
      // In production, you'd make an API call here
      console.log(`Updated ${option} to ${newValue}`);
    } catch (err) {
      console.error('Error updating option:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Admin Panel</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar with Toggle Switches */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-lg">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OnPager Admin</h1>
              <p className="text-sm text-gray-500">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Toggle Switches Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Controls</h3>
          
          {/* Construction Lines Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Construction Lines</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.boarders 
                  ? 'text-blue-800 bg-blue-100' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.boarders ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Show grid borders and layout guides</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.boarders}
                onChange={() => handleToggleChange('boarders', !debugOptions.boarders)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Grid Lines Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Grid Lines</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.gridLines 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.gridLines ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Display CSS grid overlay</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.gridLines}
                onChange={() => handleToggleChange('gridLines', !debugOptions.gridLines)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Highlight Elements Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Highlight Elements</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.highlightElements 
                  ? 'text-purple-800 bg-purple-100' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.highlightElements ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Highlight interactive elements on hover</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.highlightElements}
                onChange={() => handleToggleChange('highlightElements', !debugOptions.highlightElements)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Performance Mode Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Performance Mode</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.performanceMode 
                  ? 'text-orange-800 bg-orange-100' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.performanceMode ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Optimize for faster rendering</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.performanceMode}
                onChange={() => handleToggleChange('performanceMode', !debugOptions.performanceMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Dark Mode</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.darkMode 
                  ? 'text-gray-800 bg-gray-200' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.darkMode ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Switch to dark theme</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.darkMode}
                onChange={() => handleToggleChange('darkMode', !debugOptions.darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            </label>
          </div>

          {/* Show Metrics Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Show Metrics</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.showMetrics 
                  ? 'text-indigo-800 bg-indigo-100' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.showMetrics ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Display performance metrics</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.showMetrics}
                onChange={() => handleToggleChange('showMetrics', !debugOptions.showMetrics)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Debug Logs Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Debug Logs</label>
              <span className={`text-xs px-2 py-1 rounded-full ${
                debugOptions.debugLogs 
                  ? 'text-red-800 bg-red-100' 
                  : 'text-gray-500 bg-gray-100'
              }`}>
                {debugOptions.debugLogs ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Enable console logging</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugOptions.debugLogs}
                onChange={() => handleToggleChange('debugLogs', !debugOptions.debugLogs)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>

        {/* Back to Main Site Button */}
        <div className="p-6 border-t border-gray-200">
          <a
            href="/"
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Main Site
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-white">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Welcome to your admin control panel</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd className="text-lg font-semibold text-gray-900">2,847</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Page Views</dt>
                    <dd className="text-lg font-semibold text-gray-900">45,231</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg. Session</dt>
                    <dd className="text-lg font-semibold text-gray-900">4m 32s</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Performance</dt>
                    <dd className="text-lg font-semibold text-gray-900">98.2%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-500">See how your toggle settings affect the layout</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg transition-all duration-300 ${
                  debugOptions.boarders 
                    ? 'bg-blue-50 border-2 border-blue-300' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <h4 className="font-semibold text-blue-900 mb-3">Content Section 1</h4>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    This section demonstrates the construction lines feature. When enabled, you'll see clear borders and spacing guides.
                  </p>
                </div>

                <div className={`p-6 rounded-lg transition-all duration-300 ${
                  debugOptions.gridLines 
                    ? 'bg-green-50 border-2 border-green-300' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <h4 className="font-semibold text-green-900 mb-3">Content Section 2</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    The grid lines are controlled by the toggle switch. Toggle the switch in the sidebar to see real-time changes.
                  </p>
                </div>

                <div className={`p-6 rounded-lg transition-all duration-300 ${
                  debugOptions.highlightElements 
                    ? 'bg-purple-50 border-2 border-purple-300' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <h4 className="font-semibold text-purple-900 mb-3">Content Section 3</h4>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    This preview helps developers and designers understand the layout structure and spacing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
