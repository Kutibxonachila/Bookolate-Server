import express from "express";
import SearchController from "../controllers/search.controller.js"; // Adjust the path as needed
import elasticsearchClient from "../config/elasticsearchClient.js"; // Ensure your Elasticsearch client is properly configured

const routerSearch = express.Router();
const searchController = new SearchController(elasticsearchClient);

// Route for search requests
routerSearch.post("/search", (req, res) => searchController.search(req, res));

// Route for indexing documents
routerSearch.post("/index", (req, res) => searchController.index(req, res));

export default routerSearch;
