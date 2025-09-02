'use client';

import React from 'react';

interface FeatureToggleProps {
  id: string;
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'red' | 'gray';
  disabled?: boolean;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ 
  id, 
  label, 
  description, 
  isEnabled, 
  onToggle, 
  color = 'purple',
  disabled = false 
}) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <label className="md-switch cursor-pointer" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            role="switch"
            aria-checked={isEnabled}
            checked={isEnabled}
            onChange={() => !disabled && onToggle()}
            disabled={disabled}
            className="sr-only"
          />
          <span className="track" aria-hidden="true">
            <span className="thumb"></span>
          </span>
          <span className="label text-base font-medium text-gray-900">{label}</span>
        </label>
        
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
          isEnabled ? 'text-purple-800 bg-purple-100' : 'text-gray-500 bg-gray-100'
        }`}>
          {isEnabled ? 'ON' : 'OFF'}
        </span>
      </div>
      
      <p className="hint text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureToggle;
