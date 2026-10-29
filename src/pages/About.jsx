import { Link, useSearchParams } from 'react-router-dom';
import { ShieldAlert, Lock, ArrowLeft, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isForbidden = searchParams.get('error') === '403' || searchParams.get('status') === '403';
  if (isForbidden) {
    return (
      <PageTransition>
        <section 
          style={{ 
            minHeight: '85vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'var(--color-ivory)',
            padding: 'var(--space-16) var(--space-4)',
            textAlign: 'center'
          }}
        >
          <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8C4A5A',
                fontWeight: 600,
                marginBottom: 'var(--space-3)',
                borderBottom: '1px solid #EADBD5',
                paddingBottom: '4px'
              }}
            >
              <Lock size={12} />
              403 Forbidden — Private Atelier Archive
            </span>

            <h1 
              style={{ 
                fontSize: 'clamp(5rem, 12vw, 9rem)', 
                lineHeight: 0.95,
                margin: '0 0 var(--space-4) 0',
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em'
              }}
            >
              403
            </h1>

            <h2 
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.25
              }}
            >
              Access to This Salon Is Restricted
            </h2>

            <p 
              style={{ 
                fontSize: '1.05rem', 
                color: 'var(--color-stone)', 
                lineHeight: 1.7,
                maxWidth: '580px',
                margin: '0 auto var(--space-8) auto'
              }}
            >
              Access to the VASTRIKA Heritage Archives & Private Salon requires accredited client privileges. 
              Please authenticate your credentials or contact our atelier concierge for access.
            </p>

            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(20,20,20,0.04)',
                border: '1px solid rgba(20,20,20,0.08)',
                borderRadius: '20px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: 'var(--color-stone)',
                marginBottom: 'var(--space-8)'
              }}
            >
              <span>AUTH_STATUS:</span>
              <span style={{ color: '#8C4A5A', fontWeight: 600 }}>FORBIDDEN (HTTP 403)</span>
              <span style={{ color: 'rgba(0,0,0,0.3)' }}>|</span>
              <span>REF: VST-403-918234</span>
            </div>

            <div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '16px', 
                justifyContent: 'center',
                alignItems: 'center' 
              }}
            >
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-ivory)',
                  padding: '16px 32px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  border: '1px solid var(--color-ink)',
                  textDecoration: 'none'
                }}
              >
                <LogIn size={15} />
                Private Sign In
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    next.delete('error');
                    next.delete('status');
                    return next;
                  });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-ink)',
                  padding: '16px 28px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  border: '1px solid var(--color-ink)',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={15} />
                Return to Atelier
              </button>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }
  return (
    <PageTransition>
      {/* Hero Title Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '40px', textAlign: 'center' }}>
        <div className="container">
          <RevealGroup stagger={0.15}>
            <Reveal mask width="100%">
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
                Heritage,<br />Crafted With Love.
              </h1>
            </Reveal>
            <Reveal width="100%">
              <p style={{ fontSize: '1.125rem', color: 'var(--color-stone)', maxWidth: '700px', margin: '0 auto' }}>
                We believe that true luxury lies in our roots. Our garments celebrate the rich Indian craftsmanship, designed to become the crown jewels of your ethnic wardrobe.
              </p>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSearchParams(prev => {
                      const next = new URLSearchParams(prev);
                      next.set('error', '403');
                      return next;
                    });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-stone)',
                    background: 'transparent',
                    border: '1px dashed rgba(20,20,20,0.25)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="Simulate 403 Forbidden Error on this page"
                >
                  <ShieldAlert size={12} color="#8C4A5A" />
                  <span>Simulate 403 Error</span>
                </button>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      {/* Hero Image Collage */}
      <section style={{ paddingBottom: '60px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxHeight: '500px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
            <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l3.jpg" alt="Fashion Detail 1" />
          </div>
          <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
            <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees3.jpg" alt="Fashion Detail 2" />
          </div>
          <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
            <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l1.png" alt="Fashion Detail 3" />
          </div>
        </div>
      </section>

      {/* The Story Split */}
      <section style={{ paddingBottom: '60px' }}>
        <div className="container grid-12" style={{ alignItems: 'center' }}>
          
          <div style={{ gridColumn: 'span 5', paddingRight: '32px' }}>
            <RevealGroup stagger={0.15}>
              <Reveal mask><h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Our Story</h2></Reveal>
              <Reveal>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '24px' }}>
                  Founded on the belief that traditional artistry deserves a modern stage. Vastrika creates pieces that transcend seasons, celebrating India's rich textiles and centuries-old weaving techniques.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: '24px' }}>
                  Every garment is meticulously crafted by master artisans. We focus on precise tailoring and enduring quality, rejecting fleeting trends in favor of timeless elegance. We take pride in our roots, drawing inspiration from the vibrant colors of royal courts and the intricate motifs of ancient Indian architecture.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: '24px' }}>
                  Our journey began with a simple vision: to empower the modern woman with attire that speaks volumes of her cultural heritage while allowing her to move with contemporary grace. From the silken threads of Banarasi weaves to the delicate hand-embroidered zardozi work, every stitch tells a story of passion and dedication.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-ink)', lineHeight: 1.8, fontWeight: 500 }}>
                  Wear your heritage. Own your elegance.
                </p>
              </Reveal>
            </RevealGroup>
          </div>

          <div style={{ gridColumn: '7 / span 6', display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, marginTop: '40px', aspectRatio: '3/4', backgroundColor: 'var(--color-ivory)' }}>
              <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees1.png" alt="Fabric details" />
            </div>
            <div style={{ flex: 1, aspectRatio: '3/4', backgroundColor: 'var(--color-ivory)' }}>
              <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l2.jpg" alt="Artisan work" />
            </div>
          </div>
          
        </div>
      </section>

      {/* The Atelier Split Section */}
      <section className="relative overflow-hidden py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          
          {/* Images: On desktop left column (order-1), on mobile below text (order-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 grid grid-cols-2 gap-3 w-full"
          >
            {/* Image 1: Sherwani cutout on soft blush card */}
            <div className="relative aspect-[3/4] max-h-[240px] md:max-h-[380px] bg-[#F3E6E2] rounded-2xl flex flex-col items-center justify-center p-3 md:p-5 overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704696/sher.png"
                alt="Artisanal Sherwani"
                className="w-full h-full max-h-[85%] object-contain relative z-10 drop-shadow-sm select-none"
              />
              {/* Code-made blurred ellipse ground shadow */}
              <div className="w-[65%] h-[14px] md:h-[18px] rounded-full bg-black/20 blur-md mt-1 z-0" />
            </div>

            {/* Image 2: Saree set cutout on soft blush card, sits 24px lower (mt-6) on desktop */}
            <div className="relative aspect-[3/4] max-h-[240px] md:max-h-[380px] bg-[#F3E6E2] rounded-2xl flex flex-col items-center justify-center p-3 md:p-5 overflow-hidden shadow-sm md:mt-6">
              <img
                src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704710/sareeset.png"
                alt="Handcrafted Saree Set"
                className="w-full h-full max-h-[85%] object-contain relative z-10 drop-shadow-sm select-none"
              />
              {/* Code-made blurred ellipse ground shadow */}
              <div className="w-[65%] h-[14px] md:h-[18px] rounded-full bg-black/20 blur-md mt-1 z-0" />
            </div>
          </motion.div>

          {/* Text Block: On desktop right column (order-2), on mobile first (order-1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2 flex flex-col justify-center space-y-3"
          >
            {/* Eyebrow */}
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--color-stone)]">
              OUR STORY
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-ink)] font-normal leading-tight font-playfair">
              The Atelier
            </h2>

            {/* One short paragraph, max 3 lines */}
            <p className="text-sm md:text-base text-[var(--color-stone)] leading-relaxed max-w-lg m-0">
              Our atelier is a space of vibrant creation, where age-old techniques meet contemporary silhouettes. We partner directly with weaving clusters across India, finishing each piece with care.
            </p>

            {/* Small link with underline hover */}
            <div className="pt-1">
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-medium text-[var(--color-ink)] hover:underline underline-offset-4 transition-all"
              >
                Our Story &rarr;
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
};

export default About;
