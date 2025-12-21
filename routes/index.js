const router = require("express").Router();
const apiRoutes = require('./api');

// API routes
router.use('/api', apiRoutes);

// In production, Next.js will handle all non-API routes
// This catch-all is only needed if not using custom Next.js server
if (process.env.NODE_ENV !== 'production') {
  router.use(function(req, res) {
    res.status(404).json({ message: 'Route not found. In development, ensure Next.js dev server is running on port 3000.' });
  });
}

module.exports = router;
