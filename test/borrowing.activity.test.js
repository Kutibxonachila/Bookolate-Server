import { borrowBook } from "../src/services/user.service.js";
import { BorrowingActivity } from "../src/models/index.js";

jest.mock("../src/models/index.js");

describe("Borrowing Book Tests", () => {
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
    jest.clearAllMocks();
  });

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
