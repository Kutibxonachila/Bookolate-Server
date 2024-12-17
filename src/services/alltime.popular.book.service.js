import { AllTimePopular_Book } from "../models/index.js";
import redis from "../config/redis.js";

// Fetch all-time popular books with Redis cache
export const getAllTimePopularBooks = async () => {
  try {
    const cacheKey = "all_time_popular_books";

    // Check if the data is cached in Redis
    const cachedBooks = await redis.get(cacheKey);

    if (cachedBooks) {
      return JSON.parse(cachedBooks);
    }

    // If not cached, fetch from DB
    const books = await AllTimePopular_Book.findAll();

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(books));

    return books;
  } catch (error) {
    throw new Error("Error fetching all-time popular books: " + error.message);
  }
};

// Increment book popularity with Redis cache update
export const incrementPopularity = async (bookId) => {
  try {
    const cacheKey = `book_popularity_${bookId}`;

    // Check if the popularity is cached in Redis
    const cachedPopularity = await redis.get(cacheKey);

    if (cachedPopularity) {
      // If cached, increment the popularity count in cache
      let popularity = parseInt(cachedPopularity);
      popularity += 1;

      // Update the cache with new popularity
      await redis.setex(cacheKey, 3600, popularity);

      return popularity;
    }

    // If not cached, find the book in the database
    const record = await AllTimePopular_Book.findOne({
      where: { book_id: bookId },
    });

    if (record) {
      // Increment the popularity in the database and cache
      record.count += 1;
      await record.save();

      // Update the cache with new popularity
      await redis.setex(cacheKey, 3600, record.count);

      return record.count;
    } else {
      // If book doesn't exist, create a new record in the database
      await AllTimePopular_Book.create({ book_id: bookId, count: 1 });

      // Set the initial popularity in cache
      await redis.setex(cacheKey, 3600, 1);

      return 1;
    }
  } catch (error) {
    throw new Error("Error incrementing book popularity: " + error.message);
  }
};
