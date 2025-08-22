const app = require("./server");
import supertest from "supertest";


describe("API Endpoints", () => {
  test("GET /api/hello should return hello message", async () => {
    const res = await supertest(app).get("/api/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello World!");
  });

  test("POST /api/sum should return sum of numbers", async () => {
    const res = await supertest(app)
      .post("/api/sum")
      .send({ a: 5, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sum).toBe(8);
  });

  test("POST /api/sum should return 400 for invalid input", async () => {
    const res = await supertest(app)
      .post("/api/sum")
      .send({ a: "5", b: 3 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid input");
  });
});
