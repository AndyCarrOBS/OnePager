'use client';

import MenuBar from '@/components/MenuBar';
import UserExperienceSection from '@/components/UserExperienceSection';
import ContentTeaserSection from '@/components/ContentTeaserSection';
import KeyFeaturesSection from '@/components/KeyFeaturesSection';
import OurProductsSection from '@/components/OurProductsSection';
import { useFeatures } from '@/contexts/FeatureContext';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { isFeatureEnabled } = useFeatures();
  const [isMounted, setIsMounted] = useState(false);

  // Apply feature-based styling only after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    const root = document.documentElement;
    
    // Apply construction lines feature
    if (isFeatureEnabled('construction-lines')) {
      root.style.setProperty('--show-construction-lines', '1');
    } else {
      root.style.setProperty('--show-construction-lines', '0');
    }

    // Apply grid overlay feature
    if (isFeatureEnabled('grid-overlay')) {
      root.style.setProperty('--show-grid-overlay', '1');
    } else {
      root.style.setProperty('--show-grid-overlay', '0');
    }

    // Apply dark mode feature
    if (isFeatureEnabled('dark-mode')) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply animations feature
    if (isFeatureEnabled('animations')) {
      root.style.setProperty('--enable-animations', '1');
    } else {
      root.style.setProperty('--enable-animations', '0');
    }
  }, [isFeatureEnabled]);

  return (
    <div className="relative min-h-screen font-noto-sans overflow-hidden">
      {/* Single background gradient that covers everything */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #4c2a8a 100%)',
          zIndex: -1
        }}
      ></div>

      {/* Menu Bar - Absolute positioned as in original */}
      <MenuBar />

      {/* User Experience Section - Hero section under the menu */}
      <div className="pt-[25px]">
        <UserExperienceSection />
      </div>

      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* Our Products Section */}
      <OurProductsSection />

      {/* Content Teaser Section */}
      <ContentTeaserSection />

      {/* Body Section - Adjusted for absolute MenuBar */}
      <main className="relative z-10">
        <div className={`max-w-7xl mx-auto px-4 py-12 ${isMounted && isFeatureEnabled('construction-lines') ? 'construction-lines' : ''}`}>
          <div className="text-center">
            <h1 className="text-display-large font-bold text-white mb-6">
              Welcome to OnPager
            </h1>
            <p className="text-body text-white/80 max-w-2xl mx-auto">
              This is the main content area where we'll add all the sections from the original website. 
              Each section will be implemented as a separate component for better organization and maintainability.
            </p>
            
            {/* Div Lines Feature Indicator */}
            {isMounted && isFeatureEnabled('construction-lines') && (
              <div className="mt-8 p-6 border-2 border-purple-300 bg-purple-50/20 rounded-xl">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-purple-200">Div Lines Feature: ENABLED</h3>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  🚧 Construction lines are now visible! You can see grid borders and layout guides throughout the site.
                  <br />
                  <span className="text-purple-300 font-medium">
                    Toggle this feature in the admin panel and reload the page to see changes.
                  </span>
                </p>
              </div>
            )}

            {/* Grid Overlay Feature Indicator */}
            {isMounted && isFeatureEnabled('grid-overlay') && (
              <div className="mt-8 p-6 border-2 border-blue-300 bg-blue-50/20 rounded-xl">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-blue-200">Grid Overlay Feature: ENABLED</h3>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed">
                  📐 Grid overlay is now visible! You can see the underlying grid system for layout guidance.
                  <br />
                  <span className="text-blue-300 font-medium">
                    Toggle this feature in the admin panel and reload the page to see changes.
                  </span>
                </p>
              </div>
            )}

            {/* Menu Columns Feature Indicator */}
            {isMounted && isFeatureEnabled('menu-columns') && (
              <div className="mt-8 p-6 border-2 border-green-300 bg-green-50/20 rounded-xl">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-green-200">Menu Columns Feature: ENABLED</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-green-200 text-sm leading-relaxed">
                  🍔 Menu columns are now visible! You can see the columnar layout in the menu bar.
                  <br />
                  <span className="text-green-300 font-medium">
                    Toggle this feature in the admin panel and reload the page to see changes.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900/50 text-white mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-body text-white/70">
              © 2024 OnPager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
