const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  createTicket,
  getTickets,
  updateTicketStatus,
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/", authenticate, asyncHandler(createTicket));
router.get("/", authenticate, asyncHandler(getTickets));
router.patch("/:id/status", authenticate, authorize("admin"), asyncHandler(updateTicketStatus));

module.exports = router;
