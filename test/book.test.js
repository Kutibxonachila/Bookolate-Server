import { addBook } from "../src/services/book.service.js";

test("should add a book successfully", async () => {
  const mockBookData = {
    title: "Test Book",
    author: "John Doe",
    pages: 400,
    available: 100,
  };

  const result = await addBook(mockBookData);

  expect(result.title).toBe("Test Book");
  expect(result.author).toBe("John Doe");
  expect(result.pages).toBe(400);
  expect(result.available).toBe(100);
});
