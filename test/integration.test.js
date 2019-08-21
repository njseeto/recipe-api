const supertest = require("supertest");
const app = require("../server");
const req = supertest(app);

it("gets the home endpoint", async done => {
    const response = await req.get("/");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(17);
    done();
});