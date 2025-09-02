export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: {
    type: 'image' | 'frame' | 'complex';
    src?: string;
    className?: string;
    elements?: Array<{
      src: string;
      className: string;
    }>;
  };
  iconContainer?: string;
}

export interface KeyFeaturesSection {
  id: 'key-features';
  type: 'features-grid';
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  content: {
    features: Feature[];
  };
  styles: {
    background: 'transparent';
    textColor: 'white';
    iconBackground: '#00dfff1c';
    iconBorderRadius: '84px';
  };
}

export const keyFeaturesSection: KeyFeaturesSection = {
  id: 'key-features',
  type: 'features-grid',
  position: {
    top: 1200,
    left: 200,
    width: 1200,
    height: 400,
  },
  content: {
    features: [
      {
        id: 1,
        title: 'Entertainment Apps',
        description: 'Youtube , shahid , Watch it and so much more',
        icon: {
          type: 'image',
          src: '/img/vector-4.svg',
          className: 'absolute w-[34px] h-[26px] top-[7px] left-[3px]',
        },
        iconContainer: 'inline-flex items-center gap-2.5 p-4 relative flex-[0_0_auto] bg-[#00dfff1c] rounded-[84px]',
      },
      {
        id: 2,
        title: 'OORO Cast',
        description: 'Share photos, videos, and more on the big screen',
        icon: {
          type: 'frame',
          src: '/img/frame-1618872926.svg',
          className: 'relative flex-[0_0_auto]',
        },
      },
      {
        id: 3,
        title: 'OORO Browser',
        description: 'Search the web directly from your TV',
        icon: {
          type: 'complex',
          elements: [
            {
              src: '/img/world.png',
              className: 'absolute w-3 h-7 top-0 left-[7px]',
            },
            {
              src: '/img/vector-3.svg',
              className: 'absolute w-[26px] h-[9px] top-[9px] left-0',
            },
          ],
        },
        iconContainer: 'flex w-[72px] h-[72px] items-center justify-center gap-2.5 p-4 relative bg-[#00dfff1c] rounded-[84px] aspect-[1]',
      },
      {
        id: 4,
        title: 'OORO Media player',
        description: 'Play Music or watch videos offline now on your TV',
        icon: {
          type: 'image',
          src: '/img/vector-4.svg',
          className: 'absolute w-[34px] h-[26px] top-[7px] left-[3px]',
        },
        iconContainer: 'inline-flex items-center gap-2.5 p-4 relative flex-[0_0_auto] bg-[#00dfff1c] rounded-[84px]',
      },
    ],
  },
  styles: {
    background: 'transparent',
    textColor: 'white',
    iconBackground: '#00dfff1c',
    iconBorderRadius: '84px',
  },
};
