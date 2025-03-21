import request from "supertest";
import app from "../src/app.js";
import * as authService from "../src/services/auth.service.js"; // Import everything as authService
import { jest } from "@jest/globals";

// Mock all exports from authService
jest.mock("../src/services/auth.service.js");

describe("Auth Routes", () => {
  const testUser = { email: "test@example.com", password: "password123" };
  const token = "mocked-jwt-token";

  beforeAll(() => {
    // Mock the registerUser function using mockImplementationOnce
    authService.registerUser.mockImplementationOnce(async (email, password) => {
      if (email === "existing@example.com") {
        throw new Error("Email already in use");
      }
      return { token };
    });

    // Mock the loginUser function using mockImplementationOnce
    authService.loginUser.mockImplementationOnce(async (email, password) => {
      if (email !== testUser.email || password !== testUser.password) {
        throw new Error("Invalid credentials");
      }
      return { token };
    });
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/signup").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token", token);
  });

  it("should not register a user with an existing email", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ email: "existing@example.com", password: "password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email already in use");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/login").send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token", token);
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "wrong@example.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });
});
