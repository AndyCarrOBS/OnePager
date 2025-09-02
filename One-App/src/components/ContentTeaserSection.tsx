import React from 'react';
import { contentTeaserSection } from '@/sections/ContentTeaserSection';
import './ContentTeaserSection.css';

export default function ContentTeaserSection() {
  const { content, styles } = contentTeaserSection;

  return (
    <section
      className="content-teaser-section"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        padding: '80px 0',
        width: '100%',
        maxWidth: '72rem',
        margin: '0 auto'
        // Background is transparent - uses main page background
      }}
    >
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        textAlign: 'center',
        padding: '0 24px',
        width: '100%'
      }}>
        {/* Main Heading */}
        <h2 
          className="content-teaser-heading"
          style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: styles.textColor,
            marginBottom: '24px',
            lineHeight: '1.2',
            fontFamily: '"Noto Sans", Helvetica, sans-serif',
            marginTop: '-1px'
          }}
        >
          {content.heading}
        </h2>

        {/* Description */}
        <p 
          className="content-teaser-description"
          style={{
            fontSize: '24px',
            fontWeight: '300',
            lineHeight: '36px',
            color: styles.textColor,
            maxWidth: '740px',
            margin: '0 auto 48px',
            fontFamily: '"Noto Sans", Helvetica, sans-serif',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {content.description}
        </p>

        {/* Showcase Image */}
        <div 
          className="content-teaser-image-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px',
            width: '100%'
          }}
        >
          <img
            className="content-teaser-image"
            src={content.showcaseImage.src}
            alt={content.showcaseImage.alt}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '566px',
              objectFit: 'contain',
              borderRadius: '12px'
            }}
            onError={(e) => {
              console.error('Image failed to load:', content.showcaseImage.src);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Call to Action Button */}
        <div className="content-teaser-button-container" style={{ 
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <button
            className="content-teaser-button"
            style={{
              width: `${content.ctaButton.width}px`,
              height: `${content.ctaButton.height}px`,
              background: styles.buttonBackground,
              color: '#fff',
              fontWeight: '400',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: styles.buttonShadow,
              transition: 'all 0.2s ease',
              fontFamily: '"Noto Sans", Helvetica, sans-serif',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 63px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.buttonHoverEffect;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => {
              if (content.ctaButton.href.startsWith('#')) {
                // Handle anchor links
                const element = document.querySelector(content.ctaButton.href);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                // Handle external links
                window.open(content.ctaButton.href, '_blank');
              }
            }}
            aria-label={content.ctaButton.text}
          >
            {content.ctaButton.text}
          </button>
        </div>
      </div>
    </section>
  );
}
