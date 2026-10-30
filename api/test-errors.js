// In-memory rate limiting tracker (per IP, with sliding window)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;  // 5 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, entry);
    return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return {
      limited: true,
      remaining: 0,
      resetIn: Math.max(1, Math.ceil((entry.resetTime - now) / 1000))
    };
  }

  return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - entry.count, resetIn: Math.ceil((entry.resetTime - now) / 1000) };
}

export default async function handler(req, res) {
  // CORS & base headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Simulate-Gateway, X-Api-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse URL & queries
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const scenario = url.searchParams.get('scenario') || url.searchParams.get('error') || url.searchParams.get('status') || '';
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';

  // SCENARIO 8: HTTP 429 – Too Many Requests (Actual Rate Limiter)
  if (scenario === '429' || scenario === 'rate-limit' || url.pathname.includes('/test-rate-limit')) {
    const rateCheck = checkRateLimit(clientIp);
    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
    res.setHeader('X-RateLimit-Remaining', rateCheck.remaining.toString());
    res.setHeader('X-RateLimit-Reset', rateCheck.resetIn.toString());

    if (rateCheck.limited || scenario === '429') {
      res.setHeader('Retry-After', rateCheck.resetIn.toString());
      return res.status(429).json({
        status: 429,
        code: 'TOO_MANY_REQUESTS',
        error: 'Too Many Requests',
        message: `Atelier API request threshold exceeded. Please retry after ${rateCheck.resetIn} seconds.`,
        referenceId: 'VST-429-RATE-LIMIT',
        retryAfter: rateCheck.resetIn,
        limit: MAX_REQUESTS_PER_WINDOW,
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Request allowed by rate limiter',
      remaining: rateCheck.remaining,
      resetInSeconds: rateCheck.resetIn
    });
  }

  // SCENARIO 7: HTTP 408 – Request Timeout (Server-side Processing Timeout)
  if (scenario === '408' || scenario === 'timeout') {
    const timeoutMs = parseInt(url.searchParams.get('timeout') || '3000', 10);
    await new Promise((resolve) => setTimeout(resolve, timeoutMs));

    return res.status(408).json({
      status: 408,
      code: 'REQUEST_TIMEOUT',
      error: 'Request Timeout',
      message: 'The atelier server closed the connection because client request processing timed out.',
      referenceId: 'VST-408-TIMEOUT',
      duration: `${timeoutMs}ms`,
      timestamp: new Date().toISOString()
    });
  }

  // SCENARIO 5: HTTP 401 – Unauthorized (Authentication Required)
  if (scenario === '401' || scenario === 'unauthorized') {
    const authHeader = req.headers['authorization'] || '';
    const hasValidToken = authHeader.startsWith('Bearer vastrika_vip_token_');

    if (!hasValidToken) {
      res.setHeader('WWW-Authenticate', 'Bearer realm="VASTRIKA Private Salon Archive"');
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        error: 'Authentication Required',
        message: 'Accredited atelier authentication credentials are required to access this resource.',
        referenceId: 'VST-401-UNAUTHORIZED',
        timestamp: new Date().toISOString()
      });
    }
  }

  // SCENARIO 6: HTTP 403 – Forbidden (Permission Denied)
  if (scenario === '403' || scenario === 'forbidden') {
    return res.status(403).json({
      status: 403,
      code: 'FORBIDDEN',
      error: 'Access Forbidden',
      message: 'Your current membership does not possess clearance for the Private Haute Couture Vault.',
      referenceId: 'VST-403-FORBIDDEN',
      timestamp: new Date().toISOString()
    });
  }

  // SCENARIO 4: HTTP 404 – Not Found (Nonexistent Resource)
  if (scenario === '404' || scenario === 'not-found') {
    const resource = url.searchParams.get('resource') || 'exclusive-collection-2027';
    return res.status(404).json({
      status: 404,
      code: 'RESOURCE_NOT_FOUND',
      error: 'Atelier Resource Not Found',
      message: `The requested archive catalog '/api/atelier/${resource}' was not located on this server.`,
      referenceId: 'VST-404-NOT-FOUND',
      timestamp: new Date().toISOString()
    });
  }

  // SCENARIO 3: HTTP 502 – Bad Gateway (Simulated Upstream Gateway / Microservice Failure)
  if (scenario === '502' || scenario === 'bad-gateway') {
    return res.status(502).json({
      status: 502,
      code: 'BAD_GATEWAY',
      error: 'Bad Gateway',
      message: 'VASTRIKA Edge Gateway received an invalid response from upstream inventory microservice.',
      referenceId: 'VST-502-GATEWAY-ERR',
      upstreamService: 'inventory-vault-cluster-ap-south',
      timestamp: new Date().toISOString()
    });
  }

  // SCENARIO 2: HTTP 503 – Service Unavailable (Maintenance / Overload)
  if (scenario === '503' || scenario === 'service-unavailable') {
    res.setHeader('Retry-After', '120');
    return res.status(503).json({
      status: 503,
      code: 'SERVICE_UNAVAILABLE',
      error: 'Service Unavailable',
      message: 'The atelier server is temporarily undergoing scheduled vault maintenance. Please retry shortly.',
      referenceId: 'VST-503-MAINTENANCE',
      retryAfterSeconds: 120,
      timestamp: new Date().toISOString()
    });
  }

  // SCENARIO 1: HTTP 500 – Internal Server Error (Genuine Unhandled Exception)
  if (scenario === '500' || scenario === 'server-error') {
    try {
      // Trigger a genuine runtime exception to produce an actual server-side crash
      const uninitializedCluster = null;
      uninitializedCluster.fetchLuxuryInventorySync();
    } catch (unhandledException) {
      console.error('[API 500 Simulation] Genuine Server Exception:', unhandledException.message);
      return res.status(500).json({
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        error: 'Internal Server Error',
        message: 'A critical unhandled server exception occurred during luxury inventory synthesis.',
        referenceId: 'VST-500-784291',
        exception: unhandledException.name || 'TypeError',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Normal / Default Test Route Response
  return res.status(200).json({
    status: 200,
    service: 'VASTRIKA Real HTTP Error Testing Suite',
    scenariosAvailable: [
      { code: 500, name: 'Internal Server Error', trigger: '/api/test-errors?scenario=500' },
      { code: 503, name: 'Service Unavailable', trigger: '/api/test-errors?scenario=503' },
      { code: 502, name: 'Bad Gateway', trigger: '/api/test-errors?scenario=502' },
      { code: 404, name: 'Not Found', trigger: '/api/test-errors?scenario=404' },
      { code: 401, name: 'Unauthorized', trigger: '/api/test-errors?scenario=401' },
      { code: 403, name: 'Forbidden', trigger: '/api/test-errors?scenario=403' },
      { code: 408, name: 'Request Timeout', trigger: '/api/test-errors?scenario=408' },
      { code: 429, name: 'Too Many Requests', trigger: '/api/test-errors?scenario=429' }
    ],
    timestamp: new Date().toISOString()
  });
}
