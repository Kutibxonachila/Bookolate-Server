import request from "supertest";
import app from "../src/app.js"; // Your Express app
import { getBookAnalytics } from "../src/services/book.activity.analytic.service.js";

jest.mock("../src/services/book.service.js"); // Mock the book service

describe("Book Activity Tests", () => {
  const testBook = { id: "book123", activity: 200 };
  const testToken = "mocked-jwt-token";

  beforeAll(() => {
    getBookAnalytics.mockImplementation(async (bookId) => {
      if (bookId === testBook.id) {
        return { activity: testBook.activity };
      }
      throw new Error("Book not found");
    });
  });

  it("should get book activity", async () => {
    const res = await request(app)
      .get("/books/activity")
      .query({ bookId: testBook.id })
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("activity", testBook.activity);
  });

  it("should return error if book not found", async () => {
    const res = await request(app)
      .get("/books/activity")
      .query({ bookId: "nonexistent" })
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Book not found");
  });
});
