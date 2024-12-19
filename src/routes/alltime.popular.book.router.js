import { Router } from "express";
import {
  fetchAllTimePopularBooks,
  updateBookPopularity,
} from "../controllers/alltime.popular.book.controller.js";

const routerAllTimePopularBook = Router();

routerAllTimePopularBook.get("/get", fetchAllTimePopularBooks);
routerAllTimePopularBook.patch("/increment", updateBookPopularity);

export default routerAllTimePopularBook;
