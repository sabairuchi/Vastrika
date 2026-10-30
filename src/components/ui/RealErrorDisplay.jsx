import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  ServerCrash, 
  ShieldAlert, 
  Lock, 
  Clock, 
  Gauge, 
  Radio, 
  ArrowLeft, 
  RefreshCw, 
  LogIn 
} from 'lucide-react';
import PageTransition from '../layout/PageTransition';

export const ERROR_DETAILS = {
  500: {
    badge: '500 Internal Server Error',
    title: 'Atelier Temporarily Unavailable',
    defaultMsg: 'Failed to load the atelier collection from the server. Our artisans and technical team have been alerted and are working to restore service.',
    icon: ServerCrash,
    defaultRef: 'VST-500-784291',
    showRefresh: true,
    showHome: true
  },
  503: {
    badge: '503 Service Unavailable',
    title: 'Atelier Vault Under Maintenance',
    defaultMsg: 'The server is temporarily unable to service the request due to maintenance downtime or capacity limits. Please retry shortly.',
    icon: AlertTriangle,
    defaultRef: 'VST-503-MAINTENANCE',
    showRefresh: true,
    showHome: true
  },
  502: {
    badge: '502 Bad Gateway',
    title: 'Gateway Communication Error',
    defaultMsg: 'The VASTRIKA edge proxy received an invalid response from an upstream luxury inventory cluster.',
    icon: Radio,
    defaultRef: 'VST-502-GATEWAY-ERR',
    showRefresh: true,
    showHome: true
  },
  404: {
    badge: '404 Not Found — Archive Missing',
    title: 'Archive Record Not Found',
    defaultMsg: 'The requested piece, collection, or endpoint could not be found on this atelier server.',
    icon: AlertTriangle,
    defaultRef: 'VST-404-NOT-FOUND',
    showRefresh: false,
    showHome: true
  },
  401: {
    badge: '401 Unauthorized — Authentication Required',
    title: 'Client Credentials Required',
    defaultMsg: 'Access to the VASTRIKA Private Salon Archive requires accredited client credentials. Please authenticate to continue.',
    icon: Lock,
    defaultRef: 'VST-401-UNAUTHORIZED',
    showLogin: true,
    showHome: true
  },
  403: {
    badge: '403 Forbidden — Private Atelier Archive',
    title: 'Access to This Salon Is Restricted',
    defaultMsg: 'Access to the VASTRIKA Heritage Archives & Private Salon requires VIP clearance privileges.',
    icon: ShieldAlert,
    defaultRef: 'VST-403-FORBIDDEN',
    showLogin: true,
    showHome: true
  },
  408: {
    badge: '408 Request Timeout',
    title: 'Atelier Request Timed Out',
    defaultMsg: 'The server took longer than expected to process your request and closed the connection. Please test your network connection and reload.',
    icon: Clock,
    defaultRef: 'VST-408-TIMEOUT',
    showRefresh: true,
    showHome: true
  },
  429: {
    badge: '429 Too Many Requests — Rate Limited',
    title: 'Atelier Threshold Exceeded',
    defaultMsg: 'Too many requests were dispatched within a brief window. Our atelier rate limiter has paused further requests to protect system integrity.',
    icon: Gauge,
    defaultRef: 'VST-429-RATE-LIMIT',
    showRefresh: true,
    showHome: true
  }
};

const RealErrorDisplay = ({ 
  status = 500, 
  title, 
  message, 
  referenceId, 
  retryAfter, 
  onRetry,
  onReset 
}) => {
  const config = ERROR_DETAILS[status] || ERROR_DETAILS[500];
  const IconComponent = config.icon;

  const displayTitle = title || config.title;
  const displayMsg = message || config.defaultMsg;
  const displayRef = referenceId || config.defaultRef;

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
          {/* Badge */}
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
            <IconComponent size={13} />
            {config.badge}
          </span>

          {/* Large Status Heading */}
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
            {status}
          </h1>

          {/* Subheading */}
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
            {displayTitle}
          </h2>

          {/* Message Paragraph */}
          <p 
            style={{ 
              fontSize: '1.05rem', 
              color: 'var(--color-stone)', 
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto var(--space-6) auto'
            }}
          >
            {displayMsg}
          </p>

          {/* Reference pill */}
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
            <span>HTTP_STATUS:</span>
            <span style={{ color: '#8C4A5A', fontWeight: 600 }}>{status}</span>
            <span style={{ color: 'rgba(0,0,0,0.3)' }}>|</span>
            <span>REF:</span>
            <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{displayRef}</span>
            {retryAfter && (
              <>
                <span style={{ color: 'rgba(0,0,0,0.3)' }}>|</span>
                <span>RETRY_AFTER: {retryAfter}s</span>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '16px', 
              justifyContent: 'center',
              alignItems: 'center' 
            }}
          >
            {config.showLogin && (
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
            )}

            {config.showRefresh && (
              <button
                type="button"
                onClick={onRetry || (() => window.location.reload())}
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
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={15} />
                Retry Request
              </button>
            )}

            {onReset && (
              <button
                type="button"
                onClick={onReset}
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
                Explore Other Collections
              </button>
            )}

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
              Return to Atelier
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default RealErrorDisplay;
