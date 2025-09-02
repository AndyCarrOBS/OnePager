'use client';

import React from 'react';

const FeatureToggle = ({ 
  id, 
  label, 
  description, 
  isEnabled, 
  onToggle, 
  color = 'blue',
  disabled = false 
}) => {
  const colorClasses = {
    blue: {
      track: 'peer-checked:bg-blue-500 peer-checked:hover:bg-blue-600',
      ring: 'peer-focus:ring-blue-300',
      status: 'text-blue-800 bg-blue-100'
    },
    green: {
      track: 'peer-checked:bg-green-500 peer-checked:hover:bg-green-600',
      ring: 'peer-focus:ring-green-300',
      status: 'text-green-800 bg-green-100'
    },
    purple: {
      track: 'peer-checked:bg-purple-500 peer-checked:hover:bg-purple-600',
      ring: 'peer-focus:ring-purple-300',
      status: 'text-purple-800 bg-purple-100'
    },
    orange: {
      track: 'peer-checked:bg-orange-500 peer-checked:hover:bg-orange-600',
      ring: 'peer-focus:ring-orange-300',
      status: 'text-orange-800 bg-orange-100'
    },
    indigo: {
      track: 'peer-checked:bg-indigo-500 peer-checked:hover:bg-indigo-600',
      ring: 'peer-focus:ring-indigo-300',
      status: 'text-indigo-800 bg-indigo-100'
    },
    red: {
      track: 'peer-checked:bg-red-500 peer-checked:hover:bg-red-600',
      ring: 'peer-focus:ring-red-300',
      status: 'text-red-800 bg-red-100'
    }
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
          isEnabled ? currentColor.status : 'text-gray-500 bg-gray-100'
        }`}>
          {isEnabled ? 'ON' : 'OFF'}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">{description}</p>
      
      <label className={`group relative inline-flex items-center cursor-pointer ${
        disabled ? 'cursor-not-allowed' : ''
      }`}>
        <input
          type="checkbox"
          id={id}
          checked={isEnabled}
          onChange={() => !disabled && onToggle()}
          disabled={disabled}
          className="sr-only peer"
        />
        
        {/* Material Design Toggle Switch */}
        <div className={`
          w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
          peer-focus:ring-opacity-50 rounded-full peer transition-all duration-300 
          hover:bg-gray-300 peer-checked:after:translate-x-7 
          peer-checked:after:border-white after:content-[''] after:absolute 
          after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 
          after:border after:rounded-full after:h-5 after:w-5 
          after:transition-all after:shadow-md hover:after:shadow-lg 
          ${currentColor.track} ${currentColor.ring}
          group-hover:scale-105 transform
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}>
          {/* Track background gradient when enabled */}
          <div className="absolute inset-y-1 left-1 right-7 bg-gradient-to-r from-transparent to-white/20 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
        </div>
      </label>
    </div>
  );
};

export default FeatureToggle;
