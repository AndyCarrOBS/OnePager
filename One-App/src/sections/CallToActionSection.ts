export interface CallToActionSection {
  id: 'call-to-action';
  type: 'footer';
  position: {
    top: 6471;
    left: -1;
    width: 1442;
    height: 370;
  };
  content: {
    logo: {
      src: '/img/ooro-logo-1-2.png';
      alt: 'Ooro logo';
      width: 120;
      height: 28;
    };
    tagline: 'Questions? Comments? Concerns?';
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
    copyright: '© 2025 Transparent. All rights reserved.';
  };
  styles: {
    background: '#0e0614';
    textColor: 'white';
    opacity: 87;
    navigationTextColor: 'linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)';
  };
}

export const callToActionSection: CallToActionSection = {
  id: 'call-to-action',
  type: 'footer',
  position: {
    top: 6471,
    left: -1,
    width: 1442,
    height: 370,
  },
  content: {
    logo: {
      src: '/img/ooro-logo-1-2.png',
      alt: 'Ooro logo',
      width: 120,
      height: 28,
    },
    tagline: 'Questions? Comments? Concerns?',
    navigation: {
      items: [
        { id: 'about', text: 'About OORO', width: 'w-[110px]', href: '#' },
        { id: 'devices', text: 'Devices', width: 'w-[68px]', href: '#' },
        { id: 'content', text: 'Content', width: 'w-[75px]', href: '#' },
        { id: 'where-to-buy', text: 'Where to Buy', width: 'w-[128.71px]', href: '#' },
      ],
    },
    legal: {
      items: [
        { id: 'privacy', text: 'Privacy Policy', href: '#' },
        { id: 'terms', text: 'Terms & Conditions', href: '#' },
      ],
    },
    support: {
      items: [
        { id: 'faq', text: 'F.A.Qs', href: '#' },
      ],
    },
    copyright: '© 2025 Transparent. All rights reserved.',
  },
  styles: {
    background: '#0e0614',
    textColor: 'white',
    opacity: 87,
    navigationTextColor: 'linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)',
  },
};
