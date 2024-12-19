import express from "express";
import SearchController from "../controllers/search.controller.js"; // Adjust the path as needed
import elasticsearchClient from "../config/elasticsearchClient.js"; // Ensure your Elasticsearch client is properly configured

const router = express.Router();
const searchController = new SearchController(elasticsearchClient);

// Route for search requests
router.post("/search", (req, res) => searchController.search(req, res));

// Route for indexing documents
router.post("/index", (req, res) => searchController.index(req, res));

export default router;
