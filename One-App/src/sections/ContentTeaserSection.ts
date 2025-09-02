export interface ContentTeaserSection {
  id: 'content-teaser';
  type: 'content-showcase';
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  content: {
    heading: string;
    description: string;
    showcaseImage: {
      src: string;
      alt: string;
    };
    ctaButton: {
      text: string;
      width: number;
      height: number;
      href: string;
    };
  };
  styles: {
    background: 'transparent';
    textColor: 'white';
    buttonBackground: string;
    buttonShadow: string;
    buttonHoverEffect: string;
  };
}

export const contentTeaserSection: ContentTeaserSection = {
  id: 'content-teaser',
  type: 'content-showcase',
  position: {
    top: 800,
    left: 135,
    width: 1438,
    height: 566,
  },
  content: {
    heading: 'Don\'t Miss This Show',
    description: 'Browse movies, episodes, live TV, and more from across your favorite apps. It\'s easier than ever to discover what to watch.',
    showcaseImage: {
      src: '/img/frame-1000005164.svg',
      alt: 'Content showcase featuring various shows and movies',
    },
    ctaButton: {
      text: 'Explore now',
      width: 260,
      height: 51,
      href: '#',
    },
  },
  styles: {
    background: 'transparent',
    textColor: 'white',
    buttonBackground: '#9333ea',
    buttonShadow: '0px 4px 6px #0000002e',
    buttonHoverEffect: 'scale(1.05)',
  },
};
