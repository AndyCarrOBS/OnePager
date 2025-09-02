export interface FeaturedContentSection {
  id: 'featured-content';
  type: 'content-showcase';
  position: {
    top: 693;
    left: 135;
    width: 1438;
    height: 566;
  };
  content: {
    heading: 'Don\'t Miss This Show';
    description: 'Browse movies, episodes, live TV, and more from across your favorite apps. It\'s easier than ever to discover what to watch.';
    showcaseImage: {
      src: '/img/frame-1000005164.svg';
      alt: 'Featured content showcase displaying various movies and TV shows';
    };
    ctaButton: {
      text: 'Explore now';
      width: 260;
      height: 51;
      href: '#';
    };
  };
  styles: {
    background: 'transparent';
    textColor: 'white';
    buttonBackground: '#d9d9d9';
    buttonShadow: '0px 4px 6px #0000002e';
  };
}

export const featuredContentSection: FeaturedContentSection = {
  id: 'featured-content',
  type: 'content-showcase',
  position: {
    top: 693,
    left: 135,
    width: 1438,
    height: 566,
  },
  content: {
    heading: 'Don\'t Miss This Show',
    description: 'Browse movies, episodes, live TV, and more from across your favorite apps. It\'s easier than ever to discover what to watch.',
    showcaseImage: {
      src: '/img/frame-1000005164.svg',
      alt: 'Featured content showcase displaying various movies and TV shows',
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
    buttonBackground: '#d9d9d9',
    buttonShadow: '0px 4px 6px #0000002e',
  },
};
