import {
  getAllBook,
  getBookByQuery,
  getBookByUUID,
  DeleteAllBooks,
  addBook,
} from "../services/book.service.js";
import redis from "../config/redis.js"; // Importing Redis
import redisClient from "../config/redis.js";
// import convertToNumber from "../utils/convertNumber.js";

// Fetch all books with Redis cache
export async function FetchAllBook(req, res) {
  try {
    // Check if data is in Redis cache
    const cachedBooks = await redisClient.get("all_books");

    if (cachedBooks) {
      console.log("🚀 Using cached data");
      return res.json(JSON.parse(cachedBooks)); // Send cached response
    }

    // If not cached, fetch books from the database
    const books = await getAllBook(); // Replace with your actual DB call

    // Cache the result in Redis with expiration time (1 hour)
    await redisClient.set("all_books", JSON.stringify(books), {
      EX: 3600, // Cache expires in 1 hour
    });

    console.log("🚀 Fetched books from DB");
    res.json(books); // Send response with fetched books
  } catch (err) {
    console.error("💥 Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
}
// Fetch book by query with Redis cache
// Fetch book by query without Redis cache
export const BookGetQuery = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required",
      });
    }

    // Fetch from DB
    const books = await getBookByQuery(query);

    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found for the given query",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched book by query from database",
      data: books,
    });
  } catch (error) {
    console.error("Error fetching book by query:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching books",
      error: error.message,
    });
  }
};

// Fetch book by UUID without Redis cache
export const getBookUUID = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    // Fetch from DB
    const book = await getBookByUUID(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched book by UUID from database",
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book by UUID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the book",
      error: error.message,
    });
  }
};


const convertToNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return NaN; // Explicitly return NaN for invalid values
  }
  const number = parseInt(value, 10);
  return isNaN(number) ? NaN : number; // Return NaN if the value is not a valid number
};

// Controller function to add a new book
export const addNewBook = async (req, res) => {
  try {
    console.log(req.body);

    // Destructure request body
    const {
      title,
      author,
      publication_year,
      language,
      keywords,
      description,
      book_status,
      available,
      isbn,
      genre,
      publisher,
      pages,
    } = req.body;

    // Basic input validation
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required." });
    }

    // Convert numeric fields
    const publicationYear = convertToNumber(publication_year);
    const availableCopies = convertToNumber(available);
    const pageCount = convertToNumber(pages);

    // Validate numeric fields
    if (isNaN(publicationYear) || isNaN(availableCopies) || isNaN(pageCount)) {
      return res.status(400).json({
        error:
          "Invalid numeric values for publication_year, available, or pages. Ensure all are valid integers.",
      });
    }

    // Parse keywords safely
    let processedKeywords = [];
    try {
      processedKeywords =
        typeof keywords === "string" ? JSON.parse(keywords) : keywords || [];
    } catch (parseError) {
      return res.status(400).json({ error: "Invalid keywords format." });
    }

    // Handle image path
    const imagePath = req.file?.path || req.body.image || "";

    // Create book object
    const newBook = {
      image: imagePath,
      title,
      author,
      publication_year: publicationYear,
      language,
      keywords: processedKeywords,
      description,
      book_status,
      available: availableCopies,
      isbn,
      genre,
      publisher,
      pages: pageCount,
    };

    console.log("Second log: ", newBook);

    // Save to database
    const savedBook = await addBook(newBook);

    return res.status(201).json({
      message: "Book added successfully!",
      book: savedBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({
      error: `An unexpected error occurred while adding the book: ${error.message}`,
    });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    await updateBook(bookId, updateData);

    return res.status(200).json({ message: "Book updated successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete book by UUID
export const deleteBookByUUID = async (req, res) => {
  try {
    const { bookId } = req.params;

    const result = await deleteBookByUUID(bookId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete all books
export const deleteAllBooks = async (req, res) => {
  try {
    const result = await DeleteAllBooks(Book);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
