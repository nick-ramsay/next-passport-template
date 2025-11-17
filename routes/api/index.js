const router = require("express").Router();
const nmptRoutes = require("./nmptRoutes");

// nextjs-mongo-passport routes
router.use("/next-passport-template", nmptRoutes);

module.exports = router;