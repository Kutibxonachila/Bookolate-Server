import SearchService from "../services/search.service.js";


class SearchController {
  constructor(elasticsearchClient) {
    this.searchService = new SearchService(elasticsearchClient);
  }

  // Handles search requests
  async search(req, res) {
    try {
      const { index, query } = req.body;

      if (!index || !query) {
        return res
          .status(400)
          .json({ message: "Index and query are required." });
      }

      const result = await this.searchService.searchIndex(index, query);
      return res.status(200).json(result);
    } catch (error) {
      console.error("SearchController search error:", error.message);
      return res
        .status(500)
        .json({ message: "Error executing search.", error: error.message });
    }
  }

  // Handles indexing a document
  async index(req, res) {
    try {
      const { index, id, document } = req.body;

      if (!index || !document) {
        return res
          .status(400)
          .json({ message: "Index and document are required." });
      }

      const result = await this.searchService.indexDocument(
        index,
        id,
        document
      );
      return res
        .status(200)
        .json({ message: "Document indexed successfully.", result });
    } catch (error) {
      console.error("SearchController index error:", error.message);
      return res
        .status(500)
        .json({ message: "Error indexing document.", error: error.message });
    }
  }
}

export default SearchController;