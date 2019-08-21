const supertest = require("supertest");
const app = require("../server");
const req = supertest(app);
const testRecipe = require("../assets/test-recipe");

it("gets the home endpoint", async done => {
    const response = await req.get("/");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(17);
    done();
});

it("gets the recipe by id endpoint", async done => {
    const response = await req.get("/recipe/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(testRecipe[0]);
    done();
});

it("gets the recipe by cuisine endpoint", async done => {
    const response = await req.get("/recipe/cuisine/mexican/?page=1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.objectContaining({
            data: expect.any(Array),
            paginateOptions: expect.any(Object)
        })
    );
    done();
});
