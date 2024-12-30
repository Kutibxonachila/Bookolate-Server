import { Book } from "../models/index.js";
import { generateError } from "../utils/index.js";
// Fetch all books
export const getAllBook = async () => {
  try {
    const books = await Book.findAll();

    // Convert sequelize models to plain objects manually
    const booksData = [];
    for (let book of books) {
      booksData.push(book.get({ plain: true }));
    }

    return booksData;
  } catch (error) {
    throw new Error("Error fetching books data: " + error.message);
  }
};

// Fetch books by query
// Fetch books by query
export const getBookByQuery = async (query) => {
  try {
    const books = await Book.findAll({
      where: query,
    });

    if (!Array.isArray(books) || books.length === 0) {
      throw new Error("No books found matching the query criteria.");
    }

    // Convert sequelize models to plain objects manually
    const booksData = books.map(book => book.get({ plain: true }));

    return booksData;
  } catch (error) {
    throw new Error("Error fetching books data by query: " + error.message);
  }
};

// Fetch a book by its UUID
export const getBookByUUID = async (bookId) => {
  try {
    // Validate UUID format (optional but recommended)
    if (!bookId || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(bookId)) {
      throw new Error("Invalid UUID format.");
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error(`Book with ID ${bookId} not found.`);
    }

    return book.get({ plain: true });
  } catch (error) {
    throw new Error("Error fetching book by UUID: " + error.message);
  }
};


// Add a new book
export const addBook = async (bookData) => {
  try {
    // Ensure bookData doesn't have "cgue2e"
    const newBook = await Book.create(bookData);
    return newBook;
  } catch (error) {
    throw new Error("Error adding book: " + error.message);
  }
};




// Update book
export const updateBook = async (bookId, updateData) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book not found");

    await book.update(updateData);
  } catch (error) {
    throw new Error("Error updating book : " + error.message);
  }
};

// Delete book by UUID
export const deleteBookByUUID = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error("Book not found!");
    }

    await book.destroy();
    return { success: true, message: "Book deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting book by UUID: " + error.message);
  }
};

// Delete all books
export const DeleteAllBooks = async (Model) => {
  try {
    await Model.destroy({
      where: {},
      truncate: true,
    });

    return { success: true, message: "All data deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting all books: " + error.message);
  }
};
