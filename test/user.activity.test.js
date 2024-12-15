import { borrowBook, returnBook } from "../src/services/user.service.js";
import { BorrowingActivity } from "../src/models/index.js";

jest.mock("../src/models/index.js"); // Mock the BorrowingActivity model

describe("User Activity Tests", () => {
  const testUserId = "user123";
  const testBookId = "book123";
  const testRecord = {
    user_id: testUserId,
    book_id: testBookId,
    due_date: new Date(),
    return_date: null,
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  // Borrowing Book Tests
  describe("Borrowing a Book", () => {
    it("should borrow a book successfully", async () => {
      BorrowingActivity.create.mockResolvedValue(testRecord);

      const result = await borrowBook(testUserId, testBookId);

      expect(BorrowingActivity.create).toHaveBeenCalledWith({
        user_id: testUserId,
        book_id: testBookId,
        due_date: expect.any(Date),
      });
      expect(result).toEqual(testRecord);
    });

    it("should throw error if borrowing fails", async () => {
      BorrowingActivity.create.mockRejectedValue(new Error("Database error"));

      await expect(borrowBook(testUserId, testBookId)).rejects.toThrow(
        "Error borrowing book: Database error"
      );
    });
  });

  // Returning Book Tests
  describe("Returning a Book", () => {
    it("should return a book successfully", async () => {
      BorrowingActivity.findOne.mockResolvedValue(testRecord);

      await returnBook(testUserId, testBookId);

      expect(BorrowingActivity.findOne).toHaveBeenCalledWith({
        where: { user_id: testUserId, book_id: testBookId },
      });
      expect(testRecord.return_date).not.toBeNull();
      expect(testRecord.save).toHaveBeenCalled();
    });

    it("should throw error if no borrowing record found", async () => {
      BorrowingActivity.findOne.mockResolvedValue(null);

      await expect(returnBook(testUserId, testBookId)).rejects.toThrow(
        "Error returning book: Borrow record not found"
      );
    });

    it("should throw error if returning fails", async () => {
      BorrowingActivity.findOne.mockResolvedValue(testRecord);
      testRecord.save.mockRejectedValue(new Error("Database error"));

      await expect(returnBook(testUserId, testBookId)).rejects.toThrow(
        "Error returning book: Database error"
      );
    });
  });
});
