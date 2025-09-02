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
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '32px',
          lineHeight: '1.2',
          fontFamily: '"Noto Sans", Helvetica, sans-serif'
        }}>
          {displayData.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '36px',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '64rem',
          margin: '0 auto 64px',
          fontFamily: '"Noto Sans", Helvetica, sans-serif'
        }}>
          {displayData.subtitle}
        </p>

        {/* Central Image Display */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '64px'
        }}>
          {/* Image Container with centered positioning */}
          <div style={{
            position: 'relative',
            maxWidth: '64rem',
            width: '100%'
          }}>
            {/* Glow effect - positioned behind the content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
              borderRadius: '24px',
              filter: 'blur(16px)',
              transform: 'scale(1.1)',
              zIndex: -10
            }}></div>
            
            {/* Content container - properly centered */}
            <div style={{
              position: 'relative',
              background: '#111827',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(147, 51, 234, 0.3)'
            }}>
              {/* Image - centered within the container */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/img/1-2345685.png"
                  alt="OORO TV Platform interface showing streaming content for MENA region"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load: /img/1-2345685.png');
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully: /img/1-2345685.png');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div style={{ marginBottom: '48px' }}>
          <a href={displayData.button_url} style={{
            background: '#9333ea',
            color: 'white',
            fontWeight: '600',
            padding: '16px 48px',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            {displayData.button_text}
          </a>
        </div>
      </div>
    </section>
  );
}
