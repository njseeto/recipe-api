const expect = require("expect");
const { paginate } = require("../utils");

it("should paginate data", async () => {
    const data = await paginate("data", 1);
    expect.assertions(1);
    expect(data).toEqual({
        data: "data",
        paginateOptions: { currentPage: 1, nextPage: 2 }
    });
});
