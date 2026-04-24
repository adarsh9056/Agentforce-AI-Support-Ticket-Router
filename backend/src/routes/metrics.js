const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { getMetrics } = require("../controllers/metricsController");

const router = express.Router();

router.get("/", authenticate, authorize("admin"), asyncHandler(getMetrics));

module.exports = router;
