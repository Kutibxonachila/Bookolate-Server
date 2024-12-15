import request from "supertest";
import app from "../src/app.js"; // Your Express app
import { getAllTimePopularBooks } from "../src/services/alltime.popular.book.service.js";
jest.mock("../src/services/book.service.js"); // Mock the book service

describe("All-Time Popular Books Tests", () => {
  const testToken = "mocked-jwt-token";

  beforeAll(() => {
    getAllTimePopularBooks.mockImplementation(async () => {
      return [{ id: "book123", title: "Test Book", activity: 5000 }];
    });
  });

  it("should get all-time popular books", async () => {
    const res = await request(app)
      .get("/books/popular")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "book123", activity: 5000 }),
      ])
    );
  });
});
