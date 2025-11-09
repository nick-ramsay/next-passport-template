const router = require("express").Router();
const nmptRoutes = require("./nmptRoutes");

// nextjs-mongo-passport routes
router.use("/nextjs-mongo-passport", nmptRoutes);

module.exports = router;