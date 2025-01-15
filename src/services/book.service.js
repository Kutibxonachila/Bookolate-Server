import { Book } from "../models/index.js";
import { Op } from "sequelize";
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
export const getBookByQuery = async (query) => {
  try {
    const books = await Book.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    if (!Array.isArray(books) || books.length === 0) {
      throw new Error("No books found matching the query criteria.");
    }

    return books.map((book) => book.get({ plain: true }));
  } catch (error) {
    throw new Error("Error fetching books data by query: " + error.message);
  }
};

// Fetch a book by its UUID
export const getBookByUUID = async (bookId) => {
  try {
    // Validate UUID format
    if (
      !bookId ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        bookId
      )
    ) {
      throw new Error("Invalid UUID format.");
    }

    // Assuming `Book` is your Sequelize model
    const book = await Book.findByPk(bookId);

    if (!book) {
      return null; // Return null if book not found
    }

    return book.get({ plain: true });
  } catch (error) {
    throw new Error("Error fetching book by UUID: " + error.message);
  }
};



// Add a new book
export const addBook = async (bookData) => {
  try {
    const newBook = await Book.create(bookData); // Ensure Book model matches the structure of bookData
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
