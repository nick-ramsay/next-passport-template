// Load environment variables from root directory
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Import Express app factory from parent directory
const createExpressApp = require('../server');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

// Create Express app with all middleware and routes
const expressApp = createExpressApp();

// Create Next.js app
const nextApp = next({ dev, dir: __dirname });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Create HTTP server that handles both Express and Next.js
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // Route API calls to Express
      if (pathname && pathname.startsWith('/api')) {
        // Let Express handle the request completely
        return expressApp(req, res, (err) => {
          if (err) {
            console.error('Express error:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          }
        });
      }

      // Route everything else to Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('internal server error');
      }
    }
  });

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    const url = process.env.NODE_ENV === 'production' 
      ? (process.env.FRONTEND_URL || `http://${hostname}:${port}`)
      : `http://${hostname}:${port}`;
    console.log(`> Ready on ${url}`);
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
