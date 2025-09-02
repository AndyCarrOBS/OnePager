'use client';

import React, { useState, useEffect } from 'react';

type Language = 'EN' | 'AR';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState<Language>('EN');

  useEffect(() => {
    const savedLanguage = getCookie('siteLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'EN' || savedLanguage === 'AR')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number = 365): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const toggleLanguage = (): void => {
    const newLanguage: Language = language === 'EN' ? 'AR' : 'EN';
    setLanguage(newLanguage);
    setCookie('siteLanguage', newLanguage);
    
    if (newLanguage === 'AR') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="h-[30px] px-3 text-white cursor-pointer hover:opacity-80 transition-opacity font-medium"
      style={{
        height: '30px',
        padding: '0 1px', // Changed from '0 12px' to '0 1px'
        color: 'white',
        cursor: 'pointer',
        fontFamily: '"Noto Sans", Helvetica, sans-serif',
        fontSize: '16px',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: '24px',
        background: 'transparent',
        border: 'none',
        outline: 'none'
      }}
    >
      {language}
    </button>
  );
};

export default LanguageSelector;
