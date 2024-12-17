import debug from "debug";

// Enable debugging for a specific namespace (e.g., "app:server")
const serverDebug = debug("app:server");

// Enable debugging for another namespace
const databaseDebug = debug("app:database");

export { serverDebug, databaseDebug };
