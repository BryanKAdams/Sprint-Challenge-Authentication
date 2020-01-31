const request = require("supertest");
const server = require("../api/server");

describe("joke-router", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/jokes", function() {
    it("should return status 200", () => {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('should return JSON', function() {
        return request(server).get('/api/jokes')
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
  });
});
