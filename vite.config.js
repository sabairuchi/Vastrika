import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import bestsellersHandler from './api/bestsellers.js'

function localApiPlugin() {
  return {
    name: 'local-api-endpoints',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && (req.url.startsWith('/api/bestsellers') || req.url.startsWith('/api/bestsellers/'))) {
          // Wrap Node res.status and res.json helpers if needed
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
          try {
            await bestsellersHandler(req, res);
          } catch (err) {
            console.error('API Error:', err);
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
