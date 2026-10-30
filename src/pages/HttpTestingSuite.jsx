import { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  RefreshCcw,
  ExternalLink 
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import RealErrorDisplay from '../components/ui/RealErrorDisplay';
import { triggerErrorScenario } from '../data/api';

const SCENARIOS = [
  {
    code: 500,
    title: 'Internal Server Error',
    subtitle: 'Server-side runtime exception',
    description: 'Triggers an unhandled exception inside the serverless Node runtime and returns true HTTP 500.',
    category: 'Server Errors (5xx)'
  },
  {
    code: 503,
    title: 'Service Unavailable',
    subtitle: 'Vault maintenance & capacity',
    description: 'Returns HTTP 503 with a Retry-After header indicating temporary server maintenance.',
    category: 'Server Errors (5xx)'
  },
  {
    code: 502,
    title: 'Bad Gateway',
    subtitle: 'Upstream gateway failure',
    description: 'Simulates an upstream inventory microservice failure caught at the edge proxy, returning HTTP 502.',
    category: 'Server Errors (5xx)'
  },
  {
    code: 404,
    title: 'Not Found',
    subtitle: 'Nonexistent archive resource',
    description: 'Requests an archive catalog endpoint that does not exist on the atelier server, returning HTTP 404.',
    category: 'Client Errors (4xx)'
  },
  {
    code: 401,
    title: 'Unauthorized',
    subtitle: 'Authentication required',
    description: 'Dispatches request without valid Bearer credentials, triggering HTTP 401 with WWW-Authenticate header.',
    category: 'Client Errors (4xx)'
  },
  {
    code: 403,
    title: 'Forbidden',
    subtitle: 'Clearance permission denied',
    description: 'Requests a restricted haute couture vault resource without required permissions, returning HTTP 403.',
    category: 'Client Errors (4xx)'
  },
  {
    code: 408,
    title: 'Request Timeout',
    subtitle: 'Controlled processing timeout',
    description: 'Server intentionally stalls execution to trigger an HTTP 408 Request Timeout after processing limit.',
    category: 'Client Errors (4xx)'
  },
  {
    code: 429,
    title: 'Too Many Requests',
    subtitle: 'Active sliding window rate limiter',
    description: 'Demonstrates real rate limiting by exceeding threshold or triggering 429 directly with Retry-After.',
    category: 'Client Errors (4xx)'
  }
];

const HttpTestingSuite = () => {
  const [activeTest, setActiveTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' | 'preview-error'
  const [activeCategory, setActiveCategory] = useState('All');

  const executeScenario = async (scenarioObj) => {
    setLoading(true);
    setActiveTest(scenarioObj.code);

    const startTime = performance.now();
    try {
      await triggerErrorScenario(scenarioObj.code);
      const elapsed = Math.round(performance.now() - startTime);

      setLastResponse({
        scenario: scenarioObj.code,
        status: 200,
        ok: true,
        elapsed,
        data: { message: 'Unexpected success (scenario did not throw)' },
        headers: {}
      });
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      setLastResponse({
        scenario: scenarioObj.code,
        status: err.status || 500,
        ok: false,
        elapsed,
        code: err.code,
        referenceId: err.referenceId,
        message: err.message,
        data: err.data || {},
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Server Errors (5xx)', 'Client Errors (4xx)'];
  const filteredScenarios = activeCategory === 'All' 
    ? SCENARIOS 
    : SCENARIOS.filter(s => s.category === activeCategory);

  return (
    <PageTransition>
      <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh', padding: '60px 16px 100px 16px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '24px',
                backgroundColor: 'rgba(140, 74, 90, 0.08)',
                color: '#8C4A5A',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              <Sparkles size={13} />
              Controlled Atelier Test Harness
            </span>

            <h1 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
                fontWeight: 400, 
                color: 'var(--color-ink)', 
                lineHeight: 1.15,
                margin: '0 0 16px 0' 
              }}
            >
              Real HTTP Error Testing Suite
            </h1>

            <p style={{ color: 'var(--color-stone)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Dispatches live HTTP calls to actual serverless endpoints on <code style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>/api/test-errors</code> and <code style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>/api/bestsellers</code>. Inspect genuine status codes, response headers, and UI failover in Chrome DevTools.
            </p>

            {/* Quick links to existing pages with live error scenarios */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/shop?category=Bestsellers&error=500" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '1px solid rgba(20,20,20,0.12)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: 'var(--color-ink)',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                <span>Live Bestsellers 500 Test</span>
                <ExternalLink size={12} />
              </a>

              <a 
                href="/shop?category=Lehenga" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '1px solid rgba(20,20,20,0.12)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: 'var(--color-ink)',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                <span>Live Lehenga 404 Test</span>
                <ExternalLink size={12} />
              </a>

              <a 
                href="/about" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '1px solid rgba(20,20,20,0.12)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: 'var(--color-ink)',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                <span>Live Archive 403 Test</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid var(--color-ink)' : '1px solid rgba(20,20,20,0.15)',
                  backgroundColor: activeCategory === cat ? 'var(--color-ink)' : 'transparent',
                  color: activeCategory === cat ? 'var(--color-ivory)' : 'var(--color-ink)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of 8 Scenarios */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {filteredScenarios.map(sc => {
              const isExecuting = loading && activeTest === sc.code;
              const is5xx = sc.code >= 500;

              return (
                <div 
                  key={sc.code}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(20,20,20,0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div>
                    {/* Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span 
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          backgroundColor: is5xx ? 'rgba(140, 74, 90, 0.12)' : 'rgba(180, 130, 60, 0.12)',
                          color: is5xx ? '#8C4A5A' : '#8A5D18'
                        }}
                      >
                        HTTP {sc.code}
                      </span>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-stone)', letterSpacing: '0.1em' }}>
                        {is5xx ? 'Server Error' : 'Client Error'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ink)', margin: '0 0 6px 0' }}>
                      {sc.title}
                    </h3>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-stone)', margin: '0 0 10px 0' }}>
                      {sc.subtitle}
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(20,20,20,0.65)', lineHeight: 1.5, margin: 0 }}>
                      {sc.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => executeScenario(sc)}
                      disabled={loading}
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 14px',
                        backgroundColor: isExecuting ? 'var(--color-stone)' : 'var(--color-ink)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'opacity 0.2s'
                      }}
                    >
                      <Play size={12} />
                      {isExecuting ? 'Requesting...' : 'Dispatch HTTP'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Response Inspector Panel */}
          {lastResponse && (
            <div 
              style={{
                backgroundColor: '#1E1E24',
                color: '#E0E0E6',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
                marginBottom: '40px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Terminal size={18} color="#C49B71" />
                  <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Live HTTP Response Inspector
                  </span>
                  <span 
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: lastResponse.status >= 500 ? '#8C4A5A' : '#C49B71',
                      color: 'white',
                      fontWeight: 700
                    }}
                  >
                    HTTP {lastResponse.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setViewMode(prev => prev === 'dashboard' ? 'preview-error' : 'dashboard')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    <Eye size={12} />
                    {viewMode === 'dashboard' ? 'Preview Full Page Design' : 'Back to Inspector'}
                  </button>

                  <button
                    onClick={() => setLastResponse(null)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      color: 'rgba(255,255,255,0.5)',
                      border: 'none',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Status & Timing Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>HTTP Status</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: lastResponse.status >= 400 ? '#F87171' : '#34D399' }}>
                    {lastResponse.status} {lastResponse.data?.error || ''}
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Reference ID</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'monospace', color: '#FCD34D' }}>
                    {lastResponse.referenceId || lastResponse.data?.referenceId || 'N/A'}
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Server Latency</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'monospace' }}>
                    {lastResponse.elapsed}ms
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Error Code</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>
                    {lastResponse.code || lastResponse.data?.code || 'OK'}
                  </div>
                </div>
              </div>

              {/* JSON Payload Viewer */}
              <div style={{ backgroundColor: '#141418', borderRadius: '8px', padding: '16px', overflowX: 'auto' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  Raw Server Response Payload:
                </div>
                <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', color: '#A7F3D0', lineHeight: 1.5 }}>
                  {JSON.stringify(lastResponse.data, null, 2)}
                </pre>
              </div>

              {/* Embedded Error Page View */}
              {viewMode === 'preview-error' && (
                <div style={{ marginTop: '24px', backgroundColor: 'var(--color-ivory)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <RealErrorDisplay 
                    status={lastResponse.status}
                    title={lastResponse.data?.error}
                    message={lastResponse.data?.message}
                    referenceId={lastResponse.data?.referenceId}
                    retryAfter={lastResponse.data?.retryAfter}
                    onRetry={() => executeScenario(SCENARIOS.find(s => s.code === lastResponse.scenario))}
                  />
                </div>
              )}
            </div>
          )}

          {/* Instructions Card */}
          <div 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(20,20,20,0.08)' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldCheck size={18} color="#8C4A5A" />
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ink)', margin: 0 }}>
                Verification & DevTools Validation Steps
              </h3>
            </div>

            <ol style={{ paddingLeft: '20px', color: 'var(--color-stone)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
              <li>Press <strong>F12</strong> or <strong>Ctrl+Shift+I</strong> in your browser to open Chrome DevTools.</li>
              <li>Navigate to the <strong>Network</strong> tab and filter by <strong>Fetch/XHR</strong>.</li>
              <li>Click <strong>Dispatch HTTP</strong> on any scenario above.</li>
              <li>Verify that the request to <code style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>/api/test-errors?scenario=...</code> highlights with its exact HTTP status (500, 503, 502, 404, 401, 403, 408, 429).</li>
              <li>Select the request in DevTools to inspect the response payload, headers (<code style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>Retry-After</code>, <code style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>WWW-Authenticate</code>, <code style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>X-RateLimit-*</code>), and unique <code style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>referenceId</code>.</li>
              <li>Click <strong>Preview Full Page Design</strong> to verify that the frontend renders the custom VASTRIKA luxury error design for that status.</li>
            </ol>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default HttpTestingSuite;
