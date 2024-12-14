class SearchService {
  constructor(elasticsearchClient) {
    this.client = elasticsearchClient;
  }

  async searchIndex(index, query) {
    return await this.client.search({
      index,
      body: query,
    });
  }

  async indexDocument(index, id, document) {
    return await this.client.index({
      index,
      id,
      body: document,
    });
  }
}

export default SearchService;
