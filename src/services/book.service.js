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

export const getBookByQuery = async (queryParams) => {
  try {
    const whereClause = {};

    // Loop through query parameters to dynamically build where clause
    for (const [key, value] of Object.entries(queryParams)) {
      // Check if the value is a number and if the field exists in the model
      if (Book.rawAttributes[key]) {
        // Check if the field is numeric
        if (isNaN(value)) {
          // For non-numeric fields, perform case-insensitive search
          whereClause[key] = {
            [Op.iLike]: `%${value}%`,
          };
        } else {
          // For numeric fields like `pages`, perform an exact match
          whereClause[key] = {
            [Op.eq]: parseInt(value), // Convert value to integer for numeric fields
          };
        }
      }
    }

    // Log the whereClause to see if it's being built correctly
    console.log("Where Clause: ", whereClause);

    // If no valid fields were found, return an empty array
    if (Object.keys(whereClause).length === 0) {
      return [];
    }

    // Fetch books matching the query parameters
    const books = await Book.findAll({
      where: whereClause,
    });

    // Log the result to see what is being returned
    console.log("Fetched Books: ", books);

    // If no books found
    if (!Array.isArray(books) || books.length === 0) {
      return [];
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
