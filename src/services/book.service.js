import { Book } from "../models/index.js";

export const getAllBook = async () => {
  try {
    const books = await Book.findAll();

    // Convert sequelize models to plain objects
    // const booksData = books.map((book) => book.toJSON());

    return books;
  } catch (error) {
    throw new Error("Error fetching book's data: " + error.message);
  }
};

export const getBookByQuery = async (query) => {
  try {
    const books = await Book.findAll({
      where: query,
    });

    return books;
  } catch (error) {
    throw new Error("Error fetching book's data by QUERY:  " + error.message);
  }
};

export const getBookByUUID = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book is not found");

    return book;
  } catch (error) {
    throw new Error("Error fetching book by UUID: " + error.message);
  }
};

export const addBook = async (bookData) => {
  try {
    const newBook = await Book.create(bookData); // Assuming Book is your ORM model
    return newBook;
  } catch (error) {
    throw new Error("Error adding book: " + error.message);
  }
};

export const updateBook = async (bookId, updateData) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book is not found");
    if (book.id !== bookId)
      throw new Error("You can update only your own account");

    await book.update(updateData);
  } catch (error) {
    throw new Error("Error updating book : " + error.message);
  }
};
export const deleteBookByUUID = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error("book not found!");
    }

    if (book.id !== bookId)
      throw new Error("You can delete only your own account");

    await book.destroy();
    return { success: true, message: "book deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting book by UUID: " + error.message);
  }
};

export const DeleteAllBooks = async (Model) => {
  try {
    await Model.destroy({
      where: {},
      truncate: true,
    });

    return { success: true, message: "All data deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting book by UUID: " + error.message);
  }
};
