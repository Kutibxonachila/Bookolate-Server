import express from "express";
import {
  borrowBookController,
  returnBookController,
} from "../controllers/borrowing.activity.service.controlller.js"; // Adjust the path as needed

const routerBorrow = express.Router();

// Route for borrowing a book
routerBorrow.post("/borrow", borrowBookController);

// Route for returning a book
routerBorrow.post("/return", returnBookController);

export default routerBorrow;
