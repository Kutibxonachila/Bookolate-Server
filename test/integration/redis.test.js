import { RedisService } from "../src/services/redis.service.js";

const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
};

const redisService = new RedisService(mockRedisClient);

test("should retrieve a cache value", async () => {
  mockRedisClient.get.mockImplementation((key, cb) => {
    cb(
      null,
      JSON.stringify({
        id: 101,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      })
    );
  });

  const result = await redisService.getValue("book:101");

  expect(result).toEqual({
    id: 101,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  });

  expect(mockRedisClient.get).toHaveBeenCalledWith(
    "book:101",
    expect.any(Function)
  );
});
