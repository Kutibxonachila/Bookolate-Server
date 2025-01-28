import {
  updateBookAnalytics,
  getBookAnalytics,
} from "../services/book.activity.analytic.service.js";
import redis from "../config/redis.js";

// Update or create book analytics controller
export const updateBookAnalyticsController = async (req, res) => {
  try {
    const analyticsData = req.body;

    // Validate required fields
    if (!analyticsData.id) {
      return res
        .status(400)
        .json({ message: "Missing 'id' field in analytics data" });
    }

    // Update or create analytics record
    const updatedRecord = await updateBookAnalytics(analyticsData);

    // Respond with success
    res.status(200).json({
      message: "Book analytics updated/created successfully",
      updatedRecord,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: error.message,
    });
  }
};
// Function to fetch and update book analytics in the cache
const updateBookAnalyticsCache = async (page, pageSize) => {
  try {
    const cacheKey = `book_analytics_page_${page}_size_${pageSize}`;
    const analytics = await getBookAnalytics(page, pageSize);

    // Update the cache with fresh data
    await redis.set(cacheKey, JSON.stringify(analytics.rows), "EX", 3600);
    console.log(`Cache updated for key: ${cacheKey}`);
  } catch (error) {
    console.error("Failed to update book analytics cache:", error.message);
  }
};

// Schedule auto cache updates every 30 seconds
const scheduleCacheUpdate = (interval = 30000) => {
  setInterval(async () => {
    // Define pages and sizes to be cached (can be customized)
    const pagesToCache = [1, 2, 3]; // Example: First 3 pages
    const pageSize = 10;

    for (const page of pagesToCache) {
      await updateBookAnalyticsCache(page, pageSize);
    }
  }, interval);
};

// Start the cache update process
scheduleCacheUpdate(30000); // Update every 30 seconds

// Controller function
export const getBookAnalyticsController = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const cacheKey = `book_analytics_page_${page}_size_${pageSize}`;

    // Check if data is cached in Redis
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // If data exists in cache, return it
      return res.status(200).json({
        message: "Book analytics fetched from cache",
        data: JSON.parse(cachedData),
      });
    }

    // If no cached data, fetch from the database
    const analytics = await getBookAnalytics(page, pageSize);

    // Cache the data in Redis with an expiration time (e.g., 1 hour)
    await redis.set(cacheKey, JSON.stringify(analytics.rows), "EX", 3600);

    res.status(200).json({
      message: "Book analytics fetched successfully",
      data: analytics.rows,
      totalRecords: analytics.count,
      totalPages: Math.ceil(analytics.count / pageSize),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};