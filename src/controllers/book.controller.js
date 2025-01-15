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
export const BookGetQuery = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required and must be a valid string.",
      });
    }

    const books = await getBookByQuery(query.trim());

    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found for the given query",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched books by query from database",
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books by query:", error);
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

// const convertToNumber = (value) => {
//   if (value === null || value === undefined || value === "") {
//     return NaN; // Explicitly return NaN for invalid values
//   }
//   const number = parseInt(value, 10);
//   return isNaN(number) ? NaN : number; // Return NaN if the value is not a valid number
// };

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
      latitude,
      longitude,
      school,
      grade,
      is_subject,
      subject,
    } = req.body;

    // Basic input validation
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required." });
    }

    // Convert numeric fields and handle potential NaN values
    const publicationYear = convertToNumber(publication_year);
    const availableCopies = convertToNumber(available);
    const pageCount = convertToNumber(pages);
    const latitudeValue = convertToNumber(latitude);
    const longitudeValue = convertToNumber(longitude);
    const gradeValue = convertToNumber(grade);
    // Validate numeric fields for NaN
    if (
      isNaN(publicationYear) ||
      isNaN(availableCopies) ||
      isNaN(pageCount) ||
      isNaN(latitudeValue) ||
      isNaN(longitudeValue) ||
      isNaN(gradeValue)
    ) {
      return res.status(400).json({
        error:
          "Invalid numeric values. Ensure all numeric fields are valid integers, and no field contains NaN.",
      });
    }

    // Parse keywords safely
    let processedKeywords = [];
    try {
      if (typeof keywords === "string") {
        processedKeywords = keywords.split(",").map((item) => item.trim());
      } else if (Array.isArray(keywords)) {
        processedKeywords = keywords;
      } else {
        throw new Error("Invalid keywords format.");
      }
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
      latitude: latitudeValue,
      longitude: longitudeValue,
      school,
      grade: gradeValue,
      is_subject,
      subject,
    };

    console.log("Second log: ", newBook);

    // Save to database (Ensure safe query here)
    const savedBook = await addBook(newBook);

    // Return success response
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

function convertToNumber(value) {
  const number = Number(value);
  if (isNaN(number)) {
    console.log("Warning: Invalid number value encountered", value); // For debugging
    return 0; // Default to 0 if it's NaN
  }
  return number;
}

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
