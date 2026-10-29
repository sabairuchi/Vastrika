import React from 'react';
import { RefreshCw, ArrowLeft } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section 
          style={{ 
            minHeight: '80vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'var(--color-ivory)',
            padding: 'var(--space-16) var(--space-4)',
            textAlign: 'center'
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8C4A5A', fontWeight: 600 }}>
              Application Exception
            </span>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', margin: '16px 0', fontFamily: 'var(--font-heading)', fontWeight: 300 }}>
              500
            </h1>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '16px', fontWeight: 400 }}>
              Something Went Wrong
            </h2>
            <p style={{ color: 'var(--color-stone)', lineHeight: 1.6, marginBottom: '32px' }}>
              An unexpected error occurred while rendering this view. Our artisans and technical team have been alerted.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.resetErrorBoundary}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-ivory)',
                  padding: '14px 28px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} />
                Try Again
              </button>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-ink)',
                  padding: '14px 24px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  border: '1px solid var(--color-ink)',
                  textDecoration: 'none'
                }}
              >
                <ArrowLeft size={14} />
                Return to Atelier
              </a>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
