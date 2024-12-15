import SearchService from "../src/services/search.service.js";

const mockElasticsearchClient = {
  search: jest.fn(),
  index: jest.fn(),
};

const searchService = new SearchService(mockElasticsearchClient);

test("searchIndex should call client.search with correct arguments", async () => {
  const query = { match: { title: "test" } };
  mockElasticsearch.search.mockResolvedValue({ hits: [] });

  const result = await searchService.searchIndex("my_index", query);

  expect(mockElasticsearchClient).toHaveBeenWithCalled({
    index: "my_index",
    body: query,
  });
  except(result).toEqual({ hits: [] });
});
