import { serverDebug, databaseDebug } from "../../src/config/debug.js"; // Import debug functions

describe("Debugging Test", () => {
  it("should log debug information", () => {
    serverDebug("This is a server debug message");
    databaseDebug("This is a database debug message");
  });
});
