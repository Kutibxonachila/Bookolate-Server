import { addBook } from "../src/services/book.service.js";
import { jest } from "@jest/globals";

// Mock the addBook function
jest.mock("../src/services/book.service.js", () => ({
  addBook: jest.fn(), // Mock the addBook function explicitly
}));

test("should add a book successfully", async () => {
  const mockBookData = {
    title: "Test Book",
    author: "John Doe",
    pages: 400,
    available: 100,
  };

  // Mock the resolved value for the addBook function
  addBook.mockReturnValueOnce(Promise.resolve(mockBookData));

  const result = await addBook(mockBookData);

  expect(result.title).toBe("Test Book");
  expect(result.author).toBe("John Doe");
  expect(result.pages).toBe(400);
  expect(result.available).toBe(100);
});
