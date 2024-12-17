 import { borrowBook, returnBook } from "../services/borrowing.activity.service.js";

 export const borrowBookController = async (req, res) => {
   try {
     const { userId, bookId } = req.body;

     if (!userId || !bookId) {
       return res
         .status(400)
         .json({ success: false, message: "Missing userId or bookId." });
     }

     await borrowBook(userId, bookId);

     res
       .status(200)
       .json({
         success: true,
         message: `Book with ID ${bookId} borrowed successfully.`,
       });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
 };

 export const returnBookController = async (req, res) => {
   try {
     const { userId, bookId } = req.body;

     if (!userId || !bookId) {
       return res
         .status(400)
         .json({ success: false, message: "Missing userId or bookId." });
     }

     await returnBook(userId, bookId);

     res
       .status(200)
       .json({
         success: true,
         message: `Book with ID ${bookId} returned successfully.`,
       });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
 };
