import {
  updateBookAnalytics,
  getBookAnalytics,
} from "./book.activity.analytic.service.js";
import { BookAnalytics } from "../models/index.js";

jest.mock("../models/Book.Activiy.Analytc.js"); // Mock the model

describe("Book Activity Analytic Service", () => {
  afterEach(() => jest.clearAllMocks());

  test("should update existing book analytics", async () => {
    const analyticsData = { id: 1, views: 10 };
    const mockRecord = { update: jest.fn() };

    BookAnalytics.findOne.mockResolvedValue(mockRecord);

    await updateBookAnalytics(analyticsData);

    expect(BookAnalytics.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRecord.update).toHaveBeenCalledWith(analyticsData);
  });

  test("should create new book analytics if not found", async () => {
    const analyticsData = { id: 2, views: 5 };

    BookAnalytics.findOne.mockResolvedValue(null);
    BookAnalytics.create.mockResolvedValue(analyticsData);

    await updateBookAnalytics(analyticsData);

    expect(BookAnalytics.create).toHaveBeenCalledWith(analyticsData);
  });

  test("should fetch all book analytics", async () => {
    const mockData = [{ id: 1, views: 10 }];
    BookAnalytics.findAll.mockResolvedValue(mockData);

    const result = await getBookAnalytics();

    expect(BookAnalytics.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });
});
