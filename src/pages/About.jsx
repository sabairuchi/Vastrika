import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, LogIn } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const About = () => {
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

            <Link
              to="/"
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
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={15} />
              Return to Boutique
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
