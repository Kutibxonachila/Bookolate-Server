import SearchService from "../src/services/search.service.js";
import { jest } from "@jest/globals";

// Mock the Elasticsearch client
const mockElasticsearchClient = {
  search: jest.fn(),
  index: jest.fn(),
};

const searchService = new SearchService(mockElasticsearchClient);

test("searchIndex should call client.search with correct arguments", async () => {
  const query = { match: { title: "test" } };

  // Mock the search method to resolve with an empty hits array
  mockElasticsearchClient.search.mockResolvedValue({ hits: [] });

  // Call the method being tested
  const result = await searchService.searchIndex("my_index", query);

  // Ensure the search method was called with the correct arguments
  expect(mockElasticsearchClient.search).toHaveBeenCalledWith({
    index: "my_index",
    body: query,
  });

  // Ensure the result is the expected value
  expect(result).toEqual({ hits: [] });
});
