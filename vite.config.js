import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import bestsellersHandler from './api/bestsellers.js'
import testErrorsHandler from './api/test-errors.js'

function localApiPlugin() {
  return {
    name: 'local-api-endpoints',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Polyfill status and json if not present on Node http.ServerResponse
        if (!res.status) {
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
        }
        if (!res.json) {
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };
        }

        // 1. Route /api/test-errors
        if (req.url && (req.url.startsWith('/api/test-errors') || req.url.startsWith('/api/test-errors/'))) {
          try {
            await testErrorsHandler(req, res);
          } catch (err) {
            console.error('API Error /api/test-errors:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 500,
              code: 'INTERNAL_SERVER_ERROR',
              error: 'Internal Server Error',
              message: err.message,
              referenceId: 'VST-500-INTERNAL'
            }));
          }
          return;
        }

        // 2. Route /api/bestsellers
        if (req.url && (req.url.startsWith('/api/bestsellers') || req.url.startsWith('/api/bestsellers/'))) {
          try {
            await bestsellersHandler(req, res);
          } catch (err) {
            console.error('API Error /api/bestsellers:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 500,
              code: 'INTERNAL_SERVER_ERROR',
              error: 'Internal Server Error',
              message: err.message,
              referenceId: 'VST-500-784291'
            }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    localApiPlugin(),
  ],
})
