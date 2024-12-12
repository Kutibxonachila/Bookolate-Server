import { BookAnalytics } from "../models/Book.Activiy.Analytc.js";

export const updateBookAnalytics = async (analyticsData) => {
  try {
    const record = await BookAnalytics.findOne({
      where: { id: analyticsData.id },
    });
    if (record) {
      await record.update(analyticsData);
    } else {
      await BookAnalytics.create(analyticsData);
    }
  } catch (error) {
    throw new Error("Error updating book analytics: " + error.message);
  }
};

export const getBookAnalytics = async () => {
  try {
    return await BookAnalytics.findAll();
  } catch (error) {
    throw new Error("Error fetching book analytics: " + error.message);
  }
};
