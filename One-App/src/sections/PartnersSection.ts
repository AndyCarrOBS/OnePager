export interface PartnersSection {
  id: 'partners';
  type: 'partners-showcase';
  position: {
    top: 5451;
    left: 185;
    width: 1116;
    height: 100;
  };
  content: {
    heading: 'Our Partners';
    partnersLogo: {
      src: '/img/frame-1618873234.svg';
      alt: 'Partner logos';
    };
  };
  styles: {
    background: 'transparent';
    textColor: 'white';
    spacing: 'gap-6';
    headingFont: 'font-english-display-medium-bold';
  };
}

export const partnersSection: PartnersSection = {
  id: 'partners',
  type: 'partners-showcase',
  position: {
    top: 5451,
    left: 185,
    width: 1116,
    height: 100,
  },
  content: {
    heading: 'Our Partners',
    partnersLogo: {
      src: '/img/frame-1618873234.svg',
      alt: 'Partner logos',
    },
  },
  styles: {
    background: 'transparent',
    textColor: 'white',
    spacing: 'gap-6',
    headingFont: 'font-english-display-medium-bold',
  },
};
