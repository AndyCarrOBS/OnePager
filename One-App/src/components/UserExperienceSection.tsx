import React, { useState, useEffect } from 'react';

interface HomeEntertainmentData {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  created_at: string;
  updated_at: string;
}

export default function UserExperienceSection() {
  const [data, setData] = useState<HomeEntertainmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback data in case database fails
  const fallbackData: HomeEntertainmentData = {
    id: 0,
    title: 'First TV Platform For MENA',
    subtitle: 'Stream, discover, and enjoy content in Arabic with OORO-powered devices designed for the Middle East and North Africa',
    button_text: 'Explore OORO Devices',
    button_url: '/devices',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/home-entertainment');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const content = await response.json();
        setData(content);
      } catch (err) {
        console.error('Error fetching home entertainment data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Use fallback data instead of showing error
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use fallback data if no data from API
  const displayData = data || fallbackData;

  if (loading) {
    return (
      <section
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          padding: '32px 0 80px 0'
          // Removed background - now uses main page background
        }}
      >
        <div style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '72rem',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: '1.5rem',
            color: 'white',
            marginTop: '100px'
          }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }



  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        padding: '32px 0 80px 0'
        // Removed background - now uses main page background
      }}
    >
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '72rem',
        margin: '0 auto'
      }}>
        {/* Main Heading */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: 'white',
          marginBottom: '32px',
          lineHeight: '1.1',
          fontFamily: '"Noto Sans", Helvetica, sans-serif',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {displayData.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '26px',
          fontWeight: '400',
          lineHeight: '1.5',
          color: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '68rem',
          margin: '0 auto 64px',
          fontFamily: '"Noto Sans", Helvetica, sans-serif',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          {displayData.subtitle}
        </p>

        {/* Central Image Display */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '64px',
          padding: '0 24px'
        }}>
          {/* Image Container with enhanced positioning and effects */}
          <div style={{
            position: 'relative',
            maxWidth: '72rem',
            width: '100%'
          }}>
            {/* Enhanced glow effect - positioned behind the content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
              borderRadius: '32px',
              filter: 'blur(20px)',
              transform: 'scale(1.15)',
              zIndex: -10,
              animation: 'pulse 3s ease-in-out infinite alternate'
            }}></div>
            
            {/* Enhanced content container */}
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
              borderRadius: '32px',
              padding: '40px',
              boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(147, 51, 234, 0.2)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              {/* Image - enhanced with better styling */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <img
                  src="/img/Hero-Image.webp"
                  alt="OORO TV Platform interface showing streaming content for MENA region"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '600px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load: /img/Hero-Image.webp');
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully: /img/Hero-Image.webp');
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div style={{ marginBottom: '48px' }}>
          <a 
            href={displayData.button_url} 
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
              color: 'white',
              fontWeight: '600',
              padding: '18px 56px',
              fontSize: '1.25rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px -3px rgba(147, 51, 234, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: '"Noto Sans", Helvetica, sans-serif',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 40px -3px rgba(147, 51, 234, 0.4), 0 8px 12px -1px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(147, 51, 234, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
          >
            {displayData.button_text}
          </a>
        </div>
      </div>
    </section>
  );
}
