import { borrowBook, returnBook } from "../src/services/user.service.js"; 
import Book from "../src/models/ndex.js"; 
import BorrowingActivity from "../src/models/index.js"; 

jest.mock("../src/models/Book.js");
jest.mock("../src/models/BorrowingActivity.js"); 

describe("User Activity Tests", () => {
  const testUserId = "user123";
  const testBookId = "book123";
  const testBook = { id: testBookId, available: 3, save: jest.fn() };
  const testBorrowingActivity = {
    user_id: testUserId,
    book_id: testBookId,
    returned_date: null,
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks 
  });

  describe("Borrowing a Book", () => {
    it("should borrow a book successfully", async () => {
      // Arrange
      Book.findByPk.mockResolvedValue(testBook);
      BorrowingActivity.create.mockResolvedValue(testBorrowingActivity);

      // Act: Call the borrowBook function
      await borrowBook(testUserId, testBookId);

      // Assert: Check if the book was borrowed correctly
      expect(Book.findByPk).toHaveBeenCalledWith(testBookId);
      expect(BorrowingActivity.create).toHaveBeenCalledWith({
        user_id: testUserId,
        book_id: testBookId,
      });
      expect(testBook.available).toBe(2); // Book availability should decrease
      expect(testBook.save).toHaveBeenCalled();
    });

    it("should throw error if book is unavailable", async () => {
      // Arrange
      Book.findByPk.mockResolvedValue({ id: testBookId, available: 0 });

      // Act & Assert: Test that an error is thrown when the book is unavailable
      await expect(borrowBook(testUserId, testBookId)).rejects.toThrow(
        "Book is not available for borrowing."
      );
    });
  });

  describe("Returning a Book", () => {
    it("should return a book successfully", async () => {
      // Arrange: Mock Book and BorrowingActivity behavior
      Book.findByPk.mockResolvedValue(testBook);
      BorrowingActivity.findOne.mockResolvedValue(testBorrowingActivity);

      // Act: Call the returnBook function
      await returnBook(testUserId, testBookId);

      // Assert: Check if the book was returned correctly
      expect(BorrowingActivity.findOne).toHaveBeenCalledWith({
        where: {
          user_id: testUserId,
          book_id: testBookId,
          returned_date: null,
        },
      });
      expect(testBorrowingActivity.returned_date).not.toBeNull(); // The returned_date should be updated
      expect(testBorrowingActivity.save).toHaveBeenCalled();
      expect(testBook.available).toBe(3); // Book availability should increase
      expect(testBook.save).toHaveBeenCalled();
    });

    it("should throw error if no borrowing record found", async () => {
      // Arrange: Simulate no borrowing record found
      BorrowingActivity.findOne.mockResolvedValue(null);

      // Act & Assert: Test that an error is thrown when no borrowing record is found
      await expect(returnBook(testUserId, testBookId)).rejects.toThrow(
        "No borrowing record found."
      );
    });
  });
});
