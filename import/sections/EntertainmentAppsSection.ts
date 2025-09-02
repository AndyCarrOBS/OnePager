export interface EntertainmentApp {
  id: string;
  name: string;
  logo: string;
}

export interface EntertainmentAppsSection {
  id: 'entertainment-apps';
  type: 'apps-showcase';
  position: {
    top: 4060;
    left: 8;
    width: 1421;
    height: 200;
  };
  content: {
    heading: 'Entertainment apps';
    subtitle: 'Biggest streaming services in MENA are available now';
    apps: EntertainmentApp[];
    appsLogo: {
      src: '/img/group-1321314557.png';
      alt: 'Entertainment apps including YouTube, Netflix, VIU, Wavo, and Shahid logos';
    };
  };
  styles: {
    background: 'transparent';
    textColor: 'white';
    spacing: 'gap-10';
  };
}

export const entertainmentAppsSection: EntertainmentAppsSection = {
  id: 'entertainment-apps',
  type: 'apps-showcase',
  position: {
    top: 4060,
    left: 8,
    width: 1421,
    height: 200,
  },
  content: {
    heading: 'Entertainment apps',
    subtitle: 'Biggest streaming services in MENA are available now',
    apps: [
      { id: 'youtube', name: 'YouTube', logo: '/img/youtube-logo.png' },
      { id: 'netflix', name: 'Netflix', logo: '/img/netflix-logo.png' },
      { id: 'viu', name: 'VIU', logo: '/img/viu-logo.png' },
      { id: 'wavo', name: 'Wavo', logo: '/img/wavo-logo.png' },
      { id: 'shahid', name: 'Shahid', logo: '/img/shahid-logo.png' },
    ],
    appsLogo: {
      src: '/img/group-1321314557.png',
      alt: 'Entertainment apps including YouTube, Netflix, VIU, Wavo, and Shahid logos',
    },
  },
  styles: {
    background: 'transparent',
    textColor: 'white',
    spacing: 'gap-10',
  },
};
