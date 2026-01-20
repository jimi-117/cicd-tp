const request = require("supertest");
const app = require("../../src/server");

describe("HTTP /hello endpoints", () => {
  it("GET /hello should return Hello world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("GET /hello/:name should include name", async () => {
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Alice");
  });

  it("GET /hello/:name should decode encoded names with spaces", async () => {
    const res = await request(app).get("/hello/John%20Doe");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From John Doe");
  });

  it("GET /hello/0 returns name '0' (string)", async () => {
    const res = await request(app).get("/hello/0");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From 0");
  });

  it("POST /hello should read x-name header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Bob");
  });

  it("POST /hello without x-name should return Hello world", async () => {
    const res = await request(app).post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });
});
