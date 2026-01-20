const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E /hello endpoints", () => {
  it("GET /hello responds with Hello world", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("GET /hello/:name responds with greeting including name", async () => {
    const res = await axios.get(`${baseURL}/hello/Alice`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Alice");
  });

  it("GET /hello/:name decodes encoded names", async () => {
    const res = await axios.get(`${baseURL}/hello/John%20Doe`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From John Doe");
  });

  it("GET /hello/0 treats '0' as a name string", async () => {
    const res = await axios.get(`${baseURL}/hello/0`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From 0");
  });

  it("POST /hello reads x-name header and returns personalized greeting", async () => {
    const res = await axios.post(`${baseURL}/hello`, null, {
      headers: { "x-name": "Bob" },
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Bob");
  });

  it("POST /hello without x-name header returns default greeting", async () => {
    const res = await axios.post(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("POST /hello with empty x-name header returns default greeting", async () => {
    const res = await axios.post(`${baseURL}/hello`, null, {
      headers: { "x-name": "" },
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });
});
