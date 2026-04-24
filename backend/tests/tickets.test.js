const request = require("supertest");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test_secret";
process.env.NODE_ENV = "test";

jest.mock("../src/config/db", () => ({
  query: jest.fn(),
  testConnection: jest.fn(),
}));

jest.mock("../src/services/aiService", () => ({
  classifyTicket: jest.fn(),
}));

const { query } = require("../src/config/db");
const { classifyTicket } = require("../src/services/aiService");
const app = require("../src/app");

const adminToken = jwt.sign(
  { id: "admin-id", email: "admin@test.com", role: "admin" },
  process.env.JWT_SECRET
);
const userToken = jwt.sign(
  { id: "user-id", email: "user@test.com", role: "user" },
  process.env.JWT_SECRET
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/tickets", () => {
  it("should create a ticket and return AI classification", async () => {
    classifyTicket.mockResolvedValueOnce({
      category: "Technical",
      confidence: 0.9,
      reasoning: "Looks like a product issue.",
    });

    query
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: "ticket-1", category: "Technical", priority: "high" }],
      })
      .mockResolvedValueOnce({ rowCount: 1, rows: [] });

    const res = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        title: "Cannot access account",
        description: "My account is locked for 24 hours with no reason.",
        priority: "high",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.ticket.category).toBe("Technical");
  });

  it("should reject ticket creation without auth token", async () => {
    const res = await request(app).post("/api/tickets").send({
      title: "Test Ticket",
      description: "Test description for auth validation.",
      priority: "low",
    });

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /api/metrics", () => {
  it("should return telemetry data for admin", async () => {
    query
      .mockResolvedValueOnce({ rows: [{ hour: "2026-04-24T00:00:00.000Z", count: 4 }] })
      .mockResolvedValueOnce({
        rows: [
          { status: "open", count: 3 },
          { status: "resolved", count: 1 },
        ],
      })
      .mockResolvedValueOnce({ rows: [{ avg_hours: 5.5 }] })
      .mockResolvedValueOnce({ rows: [{ total: 4, classified: 4 }] });

    const res = await request(app)
      .get("/api/metrics")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ticketsPerHour");
    expect(res.body).toHaveProperty("avgResolutionTimeHours");
  });

  it("should deny metrics access for regular user", async () => {
    const res = await request(app)
      .get("/api/metrics")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });
});

describe("PATCH /api/tickets/:id/status", () => {
  it("should update ticket status and log telemetry event", async () => {
    query
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: "ticket-1", status: "resolved", resolved_at: "2026-04-24T00:00:00.000Z" }],
      })
      .mockResolvedValueOnce({ rowCount: 1, rows: [] });

    const res = await request(app)
      .patch("/api/tickets/ticket-1/status")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "resolved" });

    expect(res.statusCode).toBe(200);
    expect(res.body.ticket.status).toBe("resolved");
    expect(res.body.ticket.resolved_at).not.toBeNull();
  });
});
