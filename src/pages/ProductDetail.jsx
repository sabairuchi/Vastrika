import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

import { formatPrice } from '../utils/formatPrice';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ borderBottom: '1px solid var(--color-ink)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        {title}
        {isOpen ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 'var(--space-3)', color: 'var(--color-stone)' }}>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = productsData.find(p => p.id === id) || productsData[0];
  const relatedProducts = productsData.filter(p => (p.type === product.type || p.department === product.department) && p.id !== product.id).slice(0, 4);
  
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const gallery = product.images;

  const navigate = useNavigate();

  const handleInstantBuy = () => {
    navigate('/checkout', { state: { instantItem: { ...product, quantity, size: selectedSize, color: selectedColor } } });
  };

  return (
    <PageTransition>
            <section style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-8)' }}>
        <style>{`
          .pdp-col-left { grid-column: span 7; }
          .pdp-col-right { grid-column: 9 / span 4; }
          @media (max-width: 900px) {
            .pdp-col-left { grid-column: span 12 !important; }
            .pdp-col-right { grid-column: span 12 !important; }
          }
        `}</style>
        <div className="container grid-12" style={{ alignItems: 'flex-start' }}>
          
          {/* Left Column: Vertical Image Gallery */}
          <div className="pdp-col-left" style={{ display: 'flex', gap: 'var(--space-3)' }}>
            
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '80px' }}>
              <style>{`
                @media (max-width: 768px) {
                  .pdp-thumbnails { display: none !important; }
                  .pdp-grid { grid-template-columns: 1fr !important; }
                  .pdp-sticky { position: static !important; margin-top: var(--space-6); }
                }
              `}</style>
              <div className="pdp-thumbnails" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {gallery.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    style={{ 
                      width: '100%', 
                      aspectRatio: '3/4', 
                      padding: 0, 
                      border: activeImage === img ? '1px solid var(--color-ink)' : 'none',
                      opacity: activeImage === img ? 1 : 0.6,
                      cursor: 'pointer',
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div style={{ flex: 1, position: 'relative', aspectRatio: '3/4', backgroundColor: 'var(--color-ivory)', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Sticky Details */}
          <div className="pdp-col-right pdp-sticky" style={{ position: 'sticky', top: '120px' }}>
            <RevealGroup stagger={0.1}>
              <Reveal>
                <h1 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', marginBottom: 'var(--space-1)' }}>{product.name}</h1>
                <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>{formatPrice(product.price)}</p>
                <p style={{ color: 'var(--color-stone)', marginBottom: 'var(--space-6)' }}>{product.description}</p>
              </Reveal>

              <Reveal delay={0.2}>
                {/* Color Selection */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="text-label">Color</span>
                    <span className="text-label" style={{ color: 'var(--color-stone)' }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50% !important', 
                          border: '1px solid var(--color-ink)',
                          padding: '2px',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50% !important', 
                          backgroundColor: color.toLowerCase() === 'ivory' ? '#F4F1EA' : color.toLowerCase() === 'ink' ? '#141414' : color.toLowerCase() === 'stone' ? '#6B675F' : color.toLowerCase() === 'gold' ? '#D4AF37' : color.toLowerCase() === 'silver' ? '#C0C0C0' : color.toLowerCase() === 'leather' ? '#8B5A2B' : '#000'
                        }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="text-label">Size</span>
                    <span className="text-label hover-underline" style={{ cursor: 'pointer' }}>Size Guide</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          flex: 1,
                          minWidth: '60px',
                          padding: '12px 0',
                          border: '1px solid var(--color-ink)',
                          borderRadius: '6px',
                          backgroundColor: selectedSize === size ? 'var(--color-ink)' : 'transparent',
                          color: selectedSize === size ? 'var(--color-white)' : 'var(--color-ink)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Bag */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-ink)', borderRadius: '6px' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0 16px', border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                    <span style={{ fontFamily: 'var(--font-body)', width: '30px', textAlign: 'center' }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0 16px', border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                  </div>
                  
                  <div style={{ display: 'flex', flex: 1, gap: '12px' }}>
                    <button 
                      onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                      className="add-to-bag-btn"
                    >
                      Add to Bag
                    </button>
                    <button 
                      onClick={handleInstantBuy}
                      className="place-order-btn"
                    >
                      Place an Order
                    </button>
                  </div>
                  <style>{`
                    .add-to-bag-btn {
                      flex: 1;
                      position: relative;
                      overflow: hidden;
                      border: 1px solid var(--color-ink);
                      background: transparent;
                      color: var(--color-ink);
                      cursor: pointer;
                      font-family: var(--font-body);
                      font-size: 10px;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                      transition: color 0.4s ease;
                      z-index: 1;
                      padding: 16px 0;
                      border-radius: 6px;
                    }
                    .add-to-bag-btn::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -100%;
                      width: 100%;
                      height: 100%;
                      background-color: var(--color-ink);
                      transition: left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                      z-index: -1;
                    }
                    .add-to-bag-btn:hover {
                      color: var(--color-white);
                    }
                    .add-to-bag-btn:hover::before {
                      left: 0;
                    }

                    .place-order-btn {
                      flex: 1;
                      position: relative;
                      overflow: hidden;
                      border: 1px solid #d4af37;
                      background: #d4af37;
                      color: var(--color-ink);
                      cursor: pointer;
                      font-family: var(--font-body);
                      font-size: 10px;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                      transition: all 0.3s ease;
                      padding: 16px 0;
                      border-radius: 6px;
                    }
                    .place-order-btn:hover {
                      background: var(--color-ink);
                      border-color: var(--color-ink);
                      color: #d4af37;
                    }
                  `}</style>
                </div>

                {/* Accordions */}
                <div style={{ borderTop: '1px solid var(--color-ink)' }}>
                  <Accordion title="Details" content={product.description + " Hand-finished construction ensures lasting durability and comfort."} />
                  <Accordion title="Care" content="Dry clean only. Store flat in a cool, dry place." />
                  <Accordion title="Shipping & Returns" content="Complimentary express shipping on all orders. Returns accepted within 14 days of delivery." />
                </div>
              </Reveal>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section style={{ borderTop: '1px solid var(--color-ink)', marginTop: 'var(--space-12)' }}>
        <div className="container">
          <Reveal mask><h3 style={{ marginBottom: 'var(--space-8)' }}>You May Also Like</h3></Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {relatedProducts.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <Link to={`/shop/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ImageReveal src={p.images[0]} alt={p.name} delay={i * 0.1} />
                  <div style={{ marginTop: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 400 }}>{p.name}</h4>
                      <span className="text-label">{formatPrice(p.price)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
};

export default ProductDetail;
