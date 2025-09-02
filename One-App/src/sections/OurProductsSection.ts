export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  rectangleImage?: string;
  vectorImages: string[];
  logoImage?: string;
  logoBackground?: string;
}

export interface OurProductsSection {
  id: 'our-products';
  type: 'products-grid';
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  content: {
    title: string;
    products: Product[];
  };
  styles: {
    background: 'transparent';
    textColor: 'white';
    cardBackground: 'linear-gradient(180deg, rgba(82,68,155,1) 0%, rgba(27,117,186,1) 100%)';
    cardBorderRadius: '24px';
    ctaColor: 'rgba(83, 157, 214, 1)';
  };
}

export const ourProductsSection: OurProductsSection = {
  id: 'our-products',
  type: 'products-grid',
  position: {
    top: 1600,
    left: 200,
    width: 1200,
    height: 600,
  },
  content: {
    title: 'Our Products',
    products: [
      {
        id: 1,
        title: 'OORO Streaming Dongle',
        description: 'Built-in Arabic-first experience Built-in Arabic-first experience',
        image: '/img/image-163.png',
        rectangleImage: '/img/rectangle-150.svg',
        vectorImages: ['/img/vector.svg', '/img/vector-1.svg'],
      },
      {
        id: 2,
        title: 'OORO Streaming Dongle',
        description: 'Transform any TV into smart Transform\nmany TV into smart',
        image: '/img/tv-stick.png',
        logoImage: '/img/ooro-logo-1.png',
        logoBackground: '/img/rectangle-1161684.svg',
        vectorImages: ['/img/vector-2.svg', '/img/vector-3.svg'],
      },
    ],
  },
  styles: {
    background: 'transparent',
    textColor: 'white',
    cardBackground: 'linear-gradient(180deg, rgba(82,68,155,1) 0%, rgba(27,117,186,1) 100%)',
    cardBorderRadius: '24px',
    ctaColor: 'rgba(83, 157, 214, 1)',
  },
};
