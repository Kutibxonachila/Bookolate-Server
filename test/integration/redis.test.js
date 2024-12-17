import { RedisService } from "../../src/services/redis.service.js";
import { jest } from "@jest/globals";

// Mock Redis client with promise-based get method
const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
};

const redisService = new RedisService(mockRedisClient);

test("should retrieve a cache value", async () => {
  // Mock the `get` method to return a resolved promise
  mockRedisClient.get.mockImplementation((key) =>
    Promise.resolve(
      JSON.stringify({
        id: 101,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      })
    )
  );

  // Call the method being tested
  const result = await redisService.getValue("book:101");

  // Check that the result matches the expected data
  expect(result).toEqual({
    id: 101,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  });

  // Ensure that the `get` method was called with the correct parameters
  expect(mockRedisClient.get).toHaveBeenCalledWith("book:101");
});
