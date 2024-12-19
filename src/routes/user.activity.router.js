import express from "express";
import {
  borrowBookController,
  returnBookController,
} from "../controllers/user.activity.controller.js";

const routerUserBorrow = express.Router();

// Route for borrowing a book
routerUserBorrow.post("/borrow", borrowBookController);

// Route for returning a book
routerUserBorrow.post("/return", returnBookController);

export default routerUserBorrow;
