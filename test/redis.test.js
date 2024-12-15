import { RedisService } from "../src/services/redis.service.js";

const mockRedisCLient = {
  get: jest.fn(),
  set: jest.fn(),
};

const redisService = new RedisService(mockRedisCLient);

test("should retrieve a cache value", async () => {
  mockRedisCLient.get.mockImplementation((key, cb) => {
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
  expect(mockRedisCLient.get).toHaveBeenCalledWith(
    "book:101",
    expect.any(Function)
  );
});
