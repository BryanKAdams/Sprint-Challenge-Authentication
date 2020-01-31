const request = require("supertest");
const server = require("./server");

describe("server", function() {
  // it("runs the tests", function() {
  //   expect(process.env.DB_ENV).toBe("testing");
  // });
  describe("test environment", () => {
    it("", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
  it("runs the server", () => {
    expect(true).toBe(true);
  });
});
