import React from 'react';
import { ourProductsSection, Product } from '@/sections/OurProductsSection';

const ProductCard = ({ product, isFirstCard = false }: { product: Product; isFirstCard?: boolean }) => {
  // Both cards now use exactly the same structure and dimensions
  return (
    <article className="product-card-wrapper" style={{
      position: 'relative',
      width: '510px',
      height: '510px',
      borderRadius: '24px',
      padding: '2px',
      background: 'linear-gradient(180deg, rgba(82,68,155,1) 0%, rgba(27,117,186,1) 100%)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      flexShrink: 0,
      border: '2px solid red'
    }}>
      <div className="product-card-content" style={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        height: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '22px',
        background: 'transparent',
        flexShrink: 0
      }}>
        {isFirstCard ? (
        // First card: TV with rectangle overlay
        <div className="product-image-container" style={{
          position: 'relative',
          width: '350px',
          height: '220px',
          background: `url(${product.image})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid red',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          {product.rectangleImage && (
            <img
              style={{
                position: 'absolute',
                width: '230px',
                height: '205px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              alt="Rectangle"
              src={product.rectangleImage}
            />
          )}
        </div>
      ) : (
        // Second card: Dongle with logo
        <div className="product-image-container" style={{
          position: 'relative',
          width: '350px',
          height: '220px',
          background: `url(${product.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid red',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
        </div>
      )}

      <div className="product-text-content" style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        position: 'relative',
        textAlign: 'center'
      }}>
        <h3 style={{
          position: 'relative',
          width: 'fit-content',
          marginTop: '-1px',
          fontFamily: '"Noto Sans", Helvetica, sans-serif',
          fontWeight: '600',
          color: 'white',
          fontSize: '28px',
          textAlign: 'center',
          letterSpacing: '0px',
          lineHeight: '42px',
          whiteSpace: 'nowrap'
        }}>
          {product.title}
        </h3>

        <p style={{
          position: 'relative',
          alignSelf: 'stretch',
          fontFamily: '"Noto Sans", Helvetica, sans-serif',
          fontWeight: '400',
          color: 'white',
          fontSize: '20px',
          textAlign: 'center',
          letterSpacing: '0px',
          lineHeight: '30px'
        }}>
          {product.description}
        </p>

        <div className="product-cta-button" style={{
          display: 'flex',
          width: '149px',
          height: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            width: '101px',
            height: '24px',
            fontFamily: '"Noto Sans", Helvetica, sans-serif',
            fontWeight: '600',
            color: 'rgba(83, 157, 214, 1)',
            fontSize: '18px',
            textAlign: 'center',
            letterSpacing: '0px',
            lineHeight: '42px',
            whiteSpace: 'nowrap'
          }}>
            Learn More
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '8px',
            position: 'relative',
            borderRadius: '40px',
            width: '40px',
            height: '40px'
          }}>
            <div style={{
              position: 'relative',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'relative',
                width: '20px',
                height: '8px',
                top: '8px',
                left: '2px'
              }}>
                <img
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '8px',
                    top: '0',
                    left: '16px'
                  }}
                  alt="Vector"
                  src={product.vectorImages[0]}
                />

                <img
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '1px',
                    top: '4px',
                    left: '0'
                  }}
                  alt="Vector"
                  src={product.vectorImages[1]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
  );
};

export default function OurProductsSection() {
  const { content, styles } = ourProductsSection;
  const [isMobile, setIsMobile] = React.useState(false);

  // Handle responsive layout with proper breakpoint
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log('Window width:', width, 'Is mobile:', width <= 1024);
      setIsMobile(width <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1173px',
        alignItems: 'center',
        gap: '64px',
        position: 'relative',
        margin: '0 auto',
        padding: '80px 24px'
      }}
    >
      <header style={{
        position: 'relative',
        alignSelf: 'stretch',
        height: '37px',
        marginTop: '-1px',
        fontFamily: '"Noto Sans", Helvetica, sans-serif',
        fontWeight: '700',
        color: 'white',
        fontSize: isMobile ? '32px' : '48px',
        textAlign: 'center',
        letterSpacing: '0px',
        lineHeight: isMobile ? '48px' : '72px',
        whiteSpace: 'nowrap'
      }}>
        {content.title}
      </header>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '32px' : '120px',
        position: 'relative',
        alignSelf: 'stretch',
        width: '100%',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'nowrap'
      }}>
        {content.products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isFirstCard={index === 0}
          />
        ))}
      </div>
    </section>
  );
} 
