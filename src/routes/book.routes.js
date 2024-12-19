import { Router } from "express";
import {
  addBook,
  BookGetQuery,
  deleteAllBooks,
  deleteBookByUUID,
  FetchAllBook,
  getBookByUUID,
} from "../controllers/book.controller";
import upload from "../utils/fileUpload.js";
import { updateBook } from "../services/book.service";

const routerBook = Router();

routerBook.get("/all_book", FetchAllBook);
routerBook.get("/books", BookGetQuery);
routerBook.get("/book/:id", getBookByUUID);
routerBook.post("/book", upload.single("image"), addBook);
routerBook.put("/update/:id", upload.single("image"), updateBook);
routerBook.delete("/delete/:id", deleteBookByUUID);
routerBook.delete("/delete", deleteAllBooks);

export default routerBook;
