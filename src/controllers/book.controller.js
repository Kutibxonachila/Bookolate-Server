import {
  getAllBook,
  getBookByQuery,
  getBookByUUID,
  DeleteAllBooks,
  addBook
} from "../services/book.service";
import redis from "../config/redis.js"; // Importing Redis

// Fetch all books with Redis cache
export const FetchAllBook = async (req, res) => {
  try {
    const cacheKey = "all_books";

    // Check if the data is cached in Redis
    const cachedBooks = await redis.get(cacheKey);

    if (cachedBooks) {
      return res.status(200).json({
        success: true,
        message: "Fetched all books from cache",
        data: JSON.parse(cachedBooks),
      });
    }

    // If not cached, fetch from DB
    const books = await getAllBook();

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(books));

    res.status(200).json({
      success: true,
      message: "Fetched all books from database",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch book by query with Redis cache
export const BookGetQuery = async (req, res) => {
  try {
    const { query } = req.query;
    const cacheKey = `book_query_${query}`;

    // Check if the data is cached in Redis
    const cachedBook = await redis.get(cacheKey);

    if (cachedBook) {
      return res.status(200).json({
        success: true,
        message: "Fetched book by query from cache",
        data: JSON.parse(cachedBook),
      });
    }

    // If not cached, fetch from DB
    const books = await getBookByQuery(query);

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(books));

    res.status(200).json({
      success: true,
      message: "Fetched book by query from database",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch book by UUID with Redis cache
export const getBookByUUID = async (req, res) => {
  try {
    const { bookId } = req.params;
    const cacheKey = `book_${bookId}`;

    // Check if the data is cached in Redis
    const cachedBook = await redis.get(cacheKey);

    if (cachedBook) {
      return res.status(200).json({
        success: true,
        message: "Fetched book by UUID from cache",
        data: JSON.parse(cachedBook),
      });
    }

    // If not cached, fetch from DB
    const book = await getBookByUUID(bookId);

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(book));

    res.status(200).json({
      success: true,
      message: "Fetched book by UUID from database",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publication_year,
      language,
      keywords,
      description,
      book_status,
      genre,
      year,
      total_copies,
      isbn,
      publisher,
      pages,
    } = req.body;

    // Check if a file was uploaded
    const image = req.file ? req.file.filename : null;

    const newBook = await addBook({
      title,
      author,
      publication_year,
      language,
      keywords,
      description,
      book_status,
      genre,
      year,
      total_copies,
      available: total_copies,
      isbn,
      publisher,
      pages,
      image, // Save the filename for the uploaded image
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      newData: newBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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

export const deleteBookByUUID = async (req, res) => {
  try {
    const { bookId } = req.params;

    const result = await deleteBookByUUID(bookId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAllBooks = async (req, res) => {
  try {
    const result = await DeleteAllBooks(Book);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
z