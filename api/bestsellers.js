import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const products = require('../src/data/products.json');

export default function handler(req, res) {
  // CORS & headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse query parameters
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const errorParam = url.searchParams.get('error') || req.query?.error;
  const statusParam = url.searchParams.get('status') || req.query?.status;
  const triggerError = errorParam === '500' || statusParam === '500' || process.env.TEST_ERROR_500 === 'true';

  if (triggerError) {
    return res.status(500).json({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Atelier Temporarily Unavailable',
      message: 'Failed to load the Bestsellers collection from the server. Our artisans and technical team have been alerted and are working to restore service.',
      referenceId: 'VST-500-784291',
      timestamp: new Date().toISOString()
    });
  }

  // Return normal Bestsellers collection
  const bestsellers = products.filter(p => p.tags && p.tags.includes('bestseller'));
  return res.status(200).json({
    status: 200,
    category: 'Bestsellers',
    total: bestsellers.length,
    data: bestsellers
  });
}
