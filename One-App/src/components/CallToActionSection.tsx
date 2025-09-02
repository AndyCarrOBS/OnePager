import React from 'react';

interface CallToActionSectionProps {
  data: {
    content: {
      logo: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
      tagline: string;
      navigation: {
        items: Array<{
          id: string;
          text: string;
          width: string;
          href: string;
        }>;
      };
      legal: {
        items: Array<{
          id: string;
          text: string;
          href: string;
        }>;
      };
      support: {
        items: Array<{
          id: string;
          text: string;
          href: string;
        }>;
      };
      copyright: string;
    };
    styles: {
      background: string;
      textColor: string;
      opacity: number;
      navigationTextColor: string;
    };
  };
}

export default function CallToActionSection({ data }: CallToActionSectionProps) {
  return (
    <section 
      className="py-16 relative"
      style={{ 
        backgroundColor: data.styles.background,
        opacity: data.styles.opacity / 100
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={data.content.logo.src}
              alt={data.content.logo.alt}
              width={data.content.logo.width}
              height={data.content.logo.height}
              className="h-auto"
            />
          </div>
          
          {/* Tagline */}
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            {data.content.tagline}
          </h2>
          
          {/* Navigation Items */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {data.content.navigation.items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                style={{ width: item.width }}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Legal Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                {data.content.legal.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Support Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                {data.content.support.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact/CTA */}
            <div className="text-center md:text-right">
              <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
              <p className="text-white/70 text-sm mb-4">
                Have questions or need assistance?
              </p>
              <a
                href="#contact"
                className="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm">
              {data.content.copyright}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
