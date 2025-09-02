import React from 'react';
import { keyFeaturesSection, Feature } from '@/sections/KeyFeaturesSection';

export default function KeyFeaturesSection() {
  const { content, styles } = keyFeaturesSection;
  const [gridColumns, setGridColumns] = React.useState(4);
  const [gridGap, setGridGap] = React.useState(32);

  // Handle responsive grid layout
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setGridColumns(1);
        setGridGap(20);
      } else if (window.innerWidth <= 1024) {
        setGridColumns(2);
        setGridGap(24);
      } else {
        setGridColumns(4);
        setGridGap(32);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderIcon = (feature: Feature) => {
    const { icon } = feature;
    
    switch (icon.type) {
      case 'image':
        return (
          <img
            src={icon.src}
            alt={feature.title}
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain'
            }}
          />
        );
      case 'frame':
        return (
          <img
            src={icon.src}
            alt={feature.title}
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain'
            }}
          />
        );
      case 'complex':
        return (
          <div style={{
            position: 'relative',
            width: '48px',
            height: '48px'
          }}>
            {icon.elements?.map((element: { src: string; className: string }, index) => (
              <img
                key={index}
                src={element.src}
                alt=""
                style={{
                  position: 'absolute',
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain'
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        padding: '80px 0'
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
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontFamily: '"Noto Sans", Helvetica, sans-serif'
          }}>
            Key Features
          </h2>
          <p style={{
            fontSize: '24px',
            fontWeight: '400',
            lineHeight: '36px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '64rem',
            margin: '0 auto',
            fontFamily: '"Noto Sans", Helvetica, sans-serif'
          }}>
            Discover the powerful features that make OORO the ultimate TV platform for MENA
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: `${gridGap}px`,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {content.features.map((feature) => (
            <div
              key={feature.id}
              style={{
                textAlign: 'center',
                transition: 'all 0.3s ease',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* Icon Container */}
              <div 
                style={{
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  padding: '16px',
                  backgroundColor: styles.iconBackground,
                  borderRadius: styles.iconBorderRadius,
                  border: '1px solid rgba(0, 223, 255, 0.3)'
                }}
              >
                {renderIcon(feature)}
              </div>

              {/* Feature Content */}
              <div style={{ padding: '0 16px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '12px',
                  fontFamily: '"Noto Sans", Helvetica, sans-serif'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '24px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '"Noto Sans", Helvetica, sans-serif'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
