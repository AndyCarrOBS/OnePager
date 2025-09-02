import React from 'react';

interface UserExperienceSectionProps {
  data: {
    content: {
      heading: string;
      subtitle: string;
      backgroundImage: {
        src: string;
        alt: string;
      };
      brandLogo: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    };
    styles: {
      background: string;
      shadow: string;
      borderRadius: string;
    };
  };
}

export default function UserExperienceSection({ data }: UserExperienceSectionProps) {
  // Debug logging
  console.log('UserExperienceSection rendered with data:', data);
  
  // Fallback values if data is undefined
  const heading = data?.content?.heading || 'First TV Platform For MENA (Fallback)';
  const subtitle = data?.content?.subtitle || 'Stream, discover, and enjoy content in Arabic with OORO-powered devices designed for the Middle East and North Africa';
  const imageSrc = data?.content?.backgroundImage?.src || '/img/1-2345685.png';
  const imageAlt = data?.content?.backgroundImage?.alt || 'OORO TV Platform interface';

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0e0614 0%, #1a0f2e 50%, #2d1b4e 100%)'
      }}
    >
      {/* Background gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))'
      }}></div>

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
          lineHeight: '1.2'
        }}>
          {heading}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '64rem',
          margin: '0 auto 64px',
          lineHeight: '1.6'
        }}>
          {subtitle}
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
                  src={imageSrc}
                  alt={imageAlt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '16px'
                  }}
                  onError={(e) => console.error('Image failed to load:', imageSrc)}
                  onLoad={() => console.log('Image loaded successfully:', imageSrc)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div style={{ marginBottom: '48px' }}>
          <button style={{
            background: '#9333ea',
            color: 'white',
            fontWeight: '600',
            padding: '16px 48px',
            borderRadius: '9999px',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}>
            Explore OORO Devices
          </button>
        </div>

        {/* Bottom Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <a href="#streaming" style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.125rem',
            fontWeight: '500',
            textDecoration: 'none'
          }}>
            Start Streaming
          </a>
          <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
          <a href="#learn" style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.125rem',
            fontWeight: '500',
            textDecoration: 'none'
          }}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
