import { Client } from "@elastic/elasticsearch";

// Configure the Elasticsearch client
const elasticsearchClient = new Client({
  node: "http://localhost:4055", // Replace with your Elasticsearch server URL
  auth: {
    username: "elastic", // Replace with your Elasticsearch username
    password: "wEx9N2N70mycwAhLCupG2ZcI", // Replace with your Elasticsearch password
  },
  ssl: {
    rejectUnauthorized: false, // Use this if you have SSL issues (not recommended for production)
  },
});

export default elasticsearchClient;
