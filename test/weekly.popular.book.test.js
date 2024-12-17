import * as weeklyBookService from "../src/services/weekly.popular.book.service.js"; // Import the entire module
import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js"; // Assuming you're using the app from your project

jest.mock("../src/services/weekly.popular.book.service.js", () => ({
  // Mock the entire module if needed
  getWeeklyPopularBooks: jest.fn(),
}));

describe("Weekly Popular Books Tests", () => {
  const testToken = "mocked-jwt-token";

  beforeAll(() => {
    // Mock the implementation of the getWeeklyPopularBooks function
    weeklyBookService.getWeeklyPopularBooks.mockResolvedValue([
      { id: "book123", title: "Test Book", activity: 200 },
    ]);
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
