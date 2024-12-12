import { AllTimePopular_Book } from "../models/index.js";

export const getAllTimePopularBooks = async () => {
  try {
    return await AllTimePopular_Book.findAll();
  } catch (error) {
    throw new Error("Error fetching all-time popular books: " + error.message);
  }
};

export const incrementPopularity = async (bookId) => {
  try {
    const record = await AllTimePopular_Book.findOne({
      where: { book_id: bookId },
    });
    if (record) {
      record.count += 1;
      await record.save();
    } else {
      await AllTimePopular_Book.create({ book_id: bookId, count: 1 });
    }
  } catch (error) {
    throw new Error("Error incrementing book popularity: " + error.message);
  }
};
