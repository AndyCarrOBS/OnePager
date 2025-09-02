export interface HeaderSection {
  id: 'header';
  type: 'header';
  position: {
    top: 0;
    left: 0;
    width: 1450;
    height: 62;
  };
  content: {
    logo: {
      src: '/img/ooro-logo-1.png';
      alt: 'OORO logo';
      width: 156;
      height: 36.8;
    };
    navigation: {
      items: Array<{
        id: string;
        text: string;
        width: string;
        href: string;
      }>;
    };
    languageToggle: {
      arabic: 'ع';
      login: 'Login';
    };
  };
  styles: {
    background: 'transparent';
    navigationTextColor: 'linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)';
  };
}

export const headerSection: HeaderSection = {
  id: 'header',
  type: 'header',
  position: {
    top: 0,
    left: 0,
    width: 1450,
    height: 62,
  },
  content: {
    logo: {
      src: '/img/ooro-logo-1.png',
      alt: 'OORO logo',
      width: 156,
      height: 36.8,
    },
    navigation: {
      items: [
        { id: 'about', text: 'About OORO', width: 'w-[110px]', href: '#' },
        { id: 'devices', text: 'Devices', width: 'w-[66px]', href: '#' },
        { id: 'content', text: 'Content', width: 'w-[73px]', href: '#' },
        { id: 'where-to-buy', text: 'Where to Buy', width: 'w-[127px]', href: '#' },
      ],
    },
    languageToggle: {
      arabic: 'ع',
      login: 'Login',
    },
  },
  styles: {
    background: 'transparent',
    navigationTextColor: 'linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)',
  },
};
