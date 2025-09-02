'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Feature, FeatureState, FeatureToggleAction } from '@/types/features';

// Initial feature state
const initialFeatures: Feature[] = [
  // UI Features
  {
    id: 'construction-lines',
    name: 'Construction Lines',
    description: 'Show grid borders and layout guides for development',
    category: 'ui',
    isEnabled: false,
    color: 'blue',
    affectsMainApp: true
  },
  {
    id: 'menu-columns',
    name: 'Menu Columns',
    description: 'Show blue, green, and red column shading in the menu bar',
    category: 'ui',
    isEnabled: false,
    color: 'green',
    affectsMainApp: true
  },
  {
    id: 'grid-overlay',
    name: 'Grid Overlay',
    description: 'Display CSS grid structure overlay',
    category: 'ui',
    isEnabled: false,
    color: 'green',
    affectsMainApp: true
  },
  {
    id: 'element-highlighting',
    name: 'Element Highlighting',
    description: 'Highlight interactive elements on hover',
    category: 'ui',
    isEnabled: false,
    color: 'purple',
    affectsMainApp: true
  },
  
  // Performance Features
  {
    id: 'performance-mode',
    name: 'Performance Mode',
    description: 'Optimize rendering for better performance',
    category: 'performance',
    isEnabled: false,
    color: 'orange',
    affectsMainApp: true
  },
  {
    id: 'lazy-loading',
    name: 'Lazy Loading',
    description: 'Enable lazy loading for images and content',
    category: 'performance',
    isEnabled: true,
    color: 'indigo',
    affectsMainApp: true
  },
  
  // Debug Features
  {
    id: 'debug-logs',
    name: 'Debug Logs',
    description: 'Enable console logging for debugging',
    category: 'debug',
    isEnabled: false,
    color: 'red',
    affectsMainApp: false
  },
  {
    id: 'performance-metrics',
    name: 'Performance Metrics',
    description: 'Display performance metrics overlay',
    category: 'debug',
    isEnabled: false,
    color: 'indigo',
    affectsMainApp: true
  },
  
  // Content Features
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Switch to dark theme',
    category: 'content',
    isEnabled: false,
    color: 'gray',
    affectsMainApp: true
  },
  {
    id: 'animations',
    name: 'Animations',
    description: 'Enable smooth page transitions and animations',
    category: 'content',
    isEnabled: true,
    color: 'blue',
    affectsMainApp: true
  },
  
  // Navigation Features
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    description: 'Show navigation breadcrumbs',
    category: 'navigation',
    isEnabled: false,
    color: 'green',
    affectsMainApp: true
  },
  {
    id: 'search-suggestions',
    name: 'Search Suggestions',
    description: 'Enable search autocomplete and suggestions',
    category: 'navigation',
    isEnabled: true,
    color: 'purple',
    affectsMainApp: true
  }
];

// Feature reducer
type FeatureAction = 
  | { type: 'TOGGLE_FEATURE'; featureId: string }
  | { type: 'SET_FEATURE'; featureId: string; isEnabled: boolean }
  | { type: 'SET_FEATURES'; features: Feature[] }
  | { type: 'RESET_FEATURES' };

const featureReducer = (state: FeatureState, action: FeatureAction): FeatureState => {
  switch (action.type) {
    case 'TOGGLE_FEATURE':
      return {
        ...state,
        features: state.features.map(feature =>
          feature.id === action.featureId
            ? { ...feature, isEnabled: !feature.isEnabled }
            : feature
        ),
        lastUpdated: new Date().toISOString()
      };
    
    case 'SET_FEATURE':
      return {
        ...state,
        features: state.features.map(feature =>
          feature.id === action.featureId
            ? { ...feature, isEnabled: action.isEnabled }
            : feature
        ),
        lastUpdated: new Date().toISOString()
      };
    
    case 'SET_FEATURES':
      return {
        ...state,
        features: action.features,
        lastUpdated: new Date().toISOString()
      };
    
    case 'RESET_FEATURES':
      return {
        ...state,
        features: initialFeatures,
        lastUpdated: new Date().toISOString()
      };
    
    default:
      return state;
  }
};

// Feature context interface
interface FeatureContextType {
  state: FeatureState;
  toggleFeature: (featureId: string) => void;
  setFeature: (featureId: string, isEnabled: boolean) => void;
  getFeature: (featureId: string) => Feature | undefined;
  isFeatureEnabled: (featureId: string) => boolean;
  resetFeatures: () => void;
  getFeaturesByCategory: (category: string) => Feature[];
}

// Create context
const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

// Provider component
interface FeatureProviderProps {
  children: ReactNode;
}

export const FeatureProvider: React.FC<FeatureProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(featureReducer, {
    features: initialFeatures,
    lastUpdated: new Date().toISOString(),
    version: '1.0.0'
  });

  // Load features from database on mount
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const response = await fetch('/api/debug-options');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map database features to our feature state
            const dbFeatures = data.data;
            const updatedFeatures = state.features.map(feature => {
              const dbFeature = dbFeatures.find((db: any) => db.value === feature.id);
              return dbFeature ? { ...feature, isEnabled: dbFeature.settings === 'true' } : feature;
            });
            dispatch({ type: 'SET_FEATURES', features: updatedFeatures });
          }
        }
      } catch (error) {
        console.error('Failed to load features from database:', error);
      }
    };

    loadFeatures();
  }, []);

  // Context methods
  const toggleFeature = (featureId: string) => {
    dispatch({ type: 'TOGGLE_FEATURE', featureId });
  };

  const setFeature = (featureId: string, isEnabled: boolean) => {
    dispatch({ type: 'SET_FEATURE', featureId, isEnabled });
  };

  const getFeature = (featureId: string) => {
    return state.features.find(feature => feature.id === featureId);
  };

  const isFeatureEnabled = (featureId: string) => {
    const feature = getFeature(featureId);
    return feature ? feature.isEnabled : false;
  };

  const resetFeatures = () => {
    dispatch({ type: 'RESET_FEATURES' });
  };

  const getFeaturesByCategory = (category: string) => {
    return state.features.filter(feature => feature.category === category);
  };

  const value: FeatureContextType = {
    state,
    toggleFeature,
    setFeature,
    getFeature,
    isFeatureEnabled,
    resetFeatures,
    getFeaturesByCategory
  };

  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  );
};

// Custom hook to use the feature context
export const useFeatures = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
};
