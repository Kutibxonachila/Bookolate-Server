import express from "express";
import {
  fetchWeeklyPopularBooks,
  incrementWeeklyPopularity,
} from "../controllers/weekly.popular.book.controller.js";

const routerWeeklyPopular = express.Router();

// Route to fetch all weekly popular books
routerWeeklyPopular.get("/books", fetchWeeklyPopularBooks);

// Route to increment the weekly popularity of a specific book
routerWeeklyPopular.patch("/book/:bookId", incrementWeeklyPopularity);

export default routerWeeklyPopular;
