import {
  DeleteAllBooks,
  getAllBook,
  updateBook,
  getBookByQuery,
  getBookByUUID,
  deleteBookByUUID,
} from "../services/book.service";

export const FetchAllBook = async (req, res) => {
  try {
    const books = await getAllBook(); // Assuming getAllBooks is your service function

    res
      .status(200)
      .json({ success: true, message: "Fetch All Books", data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBookByQuery = async (req, res) => {
  try {
    const { query } = req.query; // Assuming query should be extracted from `req.query`
    const books = await getBooksByQuery(query); // Rename service function to avoid name conflict

    res
      .status(200)
      .json({ success: true, message: "Fetch Book By QUERY", data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBookByUUID = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract bookId from req.params

    const book = await getBookByUUID(bookId); // Assuming getBookByUUID is your service function

    res
      .status(200)
      .json({ success: true, message: "Fetch Book By UUID", data: book });
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

    const newBook = await addBook({
      // Assuming addNewBook is your service function
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
    });

    res
      .status(201)
      .json({ success: true, message: "Added Book", newData: newBook });
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
