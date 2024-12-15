import { updateBookAnalytics } from "../src/services/book.activity.analytic.service.js";

const mockRedisClient = {
  incr: jest.fn(),
  get: jest.fn(),
};





const service= updateBookAnalytics(mockRedisClient);

