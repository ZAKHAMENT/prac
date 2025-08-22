const request = require("supertest");
const app = require("./index");

describe("Simple API Tests", () => {
  test("GET / should return Hello World!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello World!");
  });

  test("POST /add should return sum of two numbers", async () => {
    const res = await request(app)
      .post("/add")
      .send({ a: 2, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sum).toBe(5);
  });
});
