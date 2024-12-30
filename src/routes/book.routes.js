import { Router } from "express";
import {
  addNewBook,
  BookGetQuery,
  deleteAllBooks,
  deleteBookByUUID,
  updateBook,
  FetchAllBook,
  getBookUUID,
} from "../controllers/book.controller.js";
import upload from "../utils/fileUpload.js";

const routerBook = Router();

routerBook.get("/all_book", FetchAllBook);
routerBook.get("/books", BookGetQuery);
routerBook.get("/:bookId", getBookUUID);
routerBook.post("/", upload.single("image"), addNewBook);
routerBook.put("/update/:bookId", upload.single("image"), updateBook);
routerBook.delete("/delete/:bookId", deleteBookByUUID);
routerBook.delete("/delete", deleteAllBooks);

export default routerBook;
