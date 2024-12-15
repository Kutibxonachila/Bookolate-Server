import request from "supertest";
import app from "../src/app.js"; //  app
import { getWeeklyPopularBooks } from "../src/services/weekly.popular.book.service.js";

jest.mock("../src/services/weekly.popular.book.service.js"); // Mock the book service

describe("Weekly Popular Books Tests", () => {
  const testToken = "mocked-jwt-token";

  beforeAll(() => {
    getWeeklyPopularBooks.mockImplementation(async () => {
      return [{ id: "book123", title: "Test Book", activity: 200 }];
    });
  });

  it("should get weekly popular books", async () => {
    const res = await request(app)
      .get("/books/weekly-popular")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "book123", activity: 200 }),
      ])
    );
  });
});
