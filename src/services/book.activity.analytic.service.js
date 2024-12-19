import BookAnalytics from "../models/Book.Activiy.Analytc.js";

export const updateBookAnalytics = async (analyticsData) => {
  if (!analyticsData || !analyticsData.id) {
    throw new Error("Invalid analytics data: Missing required 'id' field.");
  }

  try {
    const record = await BookAnalytics.findOne({
      where: { id: analyticsData.id },
    });

    if (record) {
      await record.update(analyticsData);
      return record; // Return updated record
    } else {
      const newRecord = await BookAnalytics.create(analyticsData);
      return newRecord; // Return created record
    }
  } catch (error) {
    throw new Error("Error updating book analytics: " + error.message);
  }
};
export const getBookAnalytics = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  try {
    return await BookAnalytics.findAndCountAll({
      offset,
      limit: pageSize,
      order: [["createdAt", "DESC"]], // Optional: Order by newest
    });
  } catch (error) {
    throw new Error("Error fetching book analytics: " + error.message);
  }
};
