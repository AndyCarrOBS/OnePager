export interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'ui' | 'performance' | 'debug' | 'content' | 'navigation';
  isEnabled: boolean;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'red' | 'gray';
  requiresRestart?: boolean;
  affectsMainApp?: boolean;
}

export interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  features: Feature[];
}

export interface FeatureState {
  features: Feature[];
  lastUpdated: string;
  version: string;
}

export interface FeatureToggleAction {
  featureId: string;
  isEnabled: boolean;
  timestamp: string;
  userId?: string;
}

export interface DatabaseFeature {
  id: string;
  value: string;
  settings: string;
  created_at?: string;
  updated_at?: string;
}
