'use client';

import React from 'react'
import LanguageSelector from './LanguageSelector'

const MenuBar = () => {
  const navigationItems = [
    { text: "About", width: "w-[80px]" },
    { text: "Devices", width: "w-[80px]" },
    { text: "Content", width: "w-[80px]" },
    { text: "Retail", width: "w-[80px]" },
  ];

  return (
    <header 
      className="w-full h-[62px] absolute top-0 left-0 z-20"
      style={{
        width: '100%',
        height: '62px',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 20,
        backgroundColor: '#312b50'
      }}
    >
      {/* Centered container with responsive columns */}
      <div 
        className="max-w-6xl mx-auto h-full px-6"
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          height: '100%',
          padding: '0 24px'
        }}
      >
        {/* Responsive grid layout */}
        <div 
          className="grid grid-cols-12 h-full items-center"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            height: '100%',
            alignItems: 'center',
            gap: '0'
          }}
        >
          {/* Logo - Left column (3 columns) */}
          <div 
            className="col-span-3 flex items-center justify-start"
            style={{
              gridColumn: 'span 3 / span 3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
              border: '2px solid red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)'
            }}
          >
            <img
              className="h-[28px] w-[110px] object-contain"
              alt="OORO logo"
              src="/img/ooro-logo-1.png"
              style={{
                height: '28px',
                width: '110px',
                objectFit: 'contain',
                maxWidth: '100%'
              }}
            />
          </div>

          {/* Navigation - Center column (6 columns) - Always visible for now */}
          <nav
            className="col-span-6 flex items-center justify-center gap-8"
            role="navigation"
            aria-label="Main navigation"
            style={{
              gridColumn: 'span 6 / span 6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              border: '2px solid blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)'
            }}
          >
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="relative h-8"
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '32px'
                }}
              >
                <a
                  href="#"
                  className="absolute inset-0 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    fontFamily: '"Noto Sans", Helvetica, sans-serif',
                    fontSize: '18px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    letterSpacing: '0.3px'
                  }}
                >
                  {item.text}
                </a>
              </div>
            ))}
          </nav>

          {/* Right side - Language and Login (3 columns) */}
          <div 
            className="col-span-3 flex items-center justify-end gap-6"
            style={{
              gridColumn: 'span 3 / span 3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '24px',
              border: '2px solid green',
              backgroundColor: 'rgba(0, 255, 0, 0.1)'
            }}
          >
            {/* Language Selector */}
            <LanguageSelector />

            {/* Login Button */}
            <a
              href="#"
              className="px-4 py-2 text-white rounded hover:opacity-80 transition-opacity"
              style={{
                padding: '6px 16px',
                color: 'white',
                fontFamily: '"Noto Sans", Helvetica, sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                textAlign: 'center',
                lineHeight: '20px',
                textDecoration: 'none',
                background: 'transparent',
                border: 'none',
                borderRadius: '4px',
                display: 'inline-block',
                cursor: 'pointer'
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MenuBar 