// Export all section types and components
export * from './HeaderSection';
export * from './UserExperienceSection';
export * from './FeaturedContentSection';
export * from './KeyFeaturesSection';
export * from './EntertainmentAppsSection';
export * from './StatisticsSection';
export * from './PartnersSection';
export * from './FirstTVPlatformMENASection';
export * from './CallToActionSection';
export * from './ContentTeaserSection';

// Main page configuration interface
export interface HomePageConfig {
  id: string;
  name: string;
  sections: Array<{
    id: string;
    type: string;
    displayOrder: number;
    isActive: boolean;
  }>;
  globalStyles: {
    background: string;
    width: number;
    height: number;
  };
}

// Default homepage configuration
export const defaultHomePageConfig: HomePageConfig = {
  id: 'ooro-homepage',
  name: 'OORO Homepage',
  sections: [
    { id: 'header', type: 'header', displayOrder: 1, isActive: true },
    { id: 'user-experience', type: 'hero', displayOrder: 2, isActive: true },
    { id: 'content-teaser', type: 'content-showcase', displayOrder: 3, isActive: true },
    { id: 'featured-content', type: 'content-showcase', displayOrder: 4, isActive: true },
    { id: 'key-features', type: 'features-grid', displayOrder: 5, isActive: true },
    { id: 'entertainment-apps', type: 'apps-showcase', displayOrder: 6, isActive: true },
    { id: 'statistics', type: 'stats-display', displayOrder: 7, isActive: true },
    { id: 'partners', type: 'partners-showcase', displayOrder: 8, isActive: true },
    { id: 'first-tv-platform-mena', type: 'partnership-cta', displayOrder: 9, isActive: true },
    { id: 'call-to-action', type: 'footer', displayOrder: 10, isActive: true },
  ],
  globalStyles: {
    background: 'linear-gradient(243deg,rgba(34,29,60,1)_0%,rgba(92,79,162,0.4)_100%)',
    width: 1440,
    height: 6841,
  },
};
