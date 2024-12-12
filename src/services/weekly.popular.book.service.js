import { WeeklyPopularBooks } from "../models/index.js";

export const getWeeklyPopularBooks = async () => {
  try {
    return await WeeklyPopularBooks.findAll();
  } catch (error) {
    throw new Error("Error fetching weekly popular books: " + error.message);
  }
};

export const updateWeeklyPopularity = async (bookId) => {
  try {
    const record = await WeeklyPopularBooks.findOne({
      where: { book_id: bookId },
    });
    if (record) {
      record.count += 1;
      await record.save();
    } else {
      await WeeklyPopularBooks.create({ book_id: bookId, count: 1 });
    }
  } catch (error) {
    throw new Error("Error updating weekly book popularity: " + error.message);
  }
};
