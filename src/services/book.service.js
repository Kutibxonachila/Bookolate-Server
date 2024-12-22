import { Book } from "../models/index.js";

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
export const getBookByQuery = async (query) => {
  try {
    const books = await Book.findAll({
      where: query,
    });

    if (!books.length) {
      throw new Error("No books found for the given query.");
    }

    // Convert sequelize models to plain objects manually
    const booksData = [];
    for (let book of books) {
      booksData.push(book.get({ plain: true }));
    }

    return booksData;
  } catch (error) {
    throw new Error("Error fetching books data by query: " + error.message);
  }
};

// Fetch a book by its UUID
export const getBookByUUID = async (bookId) => {
  try {
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
    // Ensure 'keywords' is an array
    if (Array.isArray(bookData.keywords) === false) {
      throw new Error("Keywords should be an array");
    }

    // Validate other fields if needed (e.g., publication year should be a number)
    if (isNaN(bookData.publication_year)) {
      throw new Error("Publication year should be a number");
    }

    // Ensure the 'available' field is a valid number (not NaN)
    if (isNaN(bookData.available)) {
      throw new Error("Available field should be a valid number");
    }

    // Create the new book record
    const newBook = await Book.create(bookData);

    return newBook.get({ plain: true });
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
