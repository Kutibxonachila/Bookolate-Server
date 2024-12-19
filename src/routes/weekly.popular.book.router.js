import express from "express";
import {
  fetchWeeklyPopularBooks,
  incrementWeeklyPopularity,
} from "../controllers/weekly.popular.book.controller.js";

const router = express.Router();

// Route to fetch all weekly popular books
router.get("/weekly_books", fetchWeeklyPopularBooks);

// Route to increment the weekly popularity of a specific book
router.patch("/weekly_book/:bookId", incrementWeeklyPopularity);

export default router;
