const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { readCSVToJSON, paginate } = require("./utils");
const FILE_PATH = "./assets/recipe-data.csv";

// parse application/json
app.use(bodyParser.json());

app.all('*', function (req, res) {
    throw new Error("Bad request")
})
app.use(function (e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({ error: { msg: e.message, status: 400 } });
    }
});

app.get("/", async (req, res) => {
    try {
        const parsedResults = await readCSVToJSON(FILE_PATH);
        res.send(parsedResults);
    } catch (err) {
        throw err;
    }
});

app.get("/recipe/:id", async (req, res) => {
    try {
        if (req.params.id > 17)
            return res
                .status(400)
                .send({ error: "invalid id, please use numbers 1 to 17" });
        const id = req.params.id;
        const parsedResults = await readCSVToJSON(FILE_PATH);
        const requestedRecipe = parsedResults[id - 1];
        res.json(requestedRecipe);
    } catch (err) {
        throw err;
    }
});

app.get("/recipe/cuisine/:cuisine/", async (req, res) => {
    try {
        const cuisine = req.params.cuisine;
        switch (cuisine) {
            case "asian":
                break;
            case "british":
                break;
            case "italian":
                break;
            case "mexican":
                break;
            case "mediterranean":
                break;
            default:
                res.status(400).send({
                    error:
                        "invalid cuisine, please use one of asian, italian, british, mediterranean or mexican"
                });
        }
        const parsedResults = await readCSVToJSON(FILE_PATH);
        const results = parsedResults
            .filter(obj => obj.recipe_cuisine === cuisine)
            .map(recipe => ({
                id: recipe.id,
                title: recipe.title,
                description: recipe.marketing_description
            }));
        const page = req.query.page;
        const paginateResults = paginate(results, page);
        res.json(paginateResults);
    } catch (err) {
        throw err;
    }
});

app.patch("/recipe/:id", async (req, res) => {
    try {
        if (req.params.id > 17)
            return res
                .status(400)
                .send({ error: "invalid id, please use numbers 1 to 17" });
        const id = req.params.id;
        const parsedResults = await readCSVToJSON(FILE_PATH);
        const matchedRecipe = parsedResults.find(result => result.id === id);
        const newResult = {
            ...matchedRecipe,
            ...req.body
        };

        console.log(req.body)
        res.json(newResult);
    } catch (err) {
        throw err;
    }
});

const server = app.listen(3000, () =>
    console.log("Server is listening on port 3000. Ready to accept requests!")
);

module.exports = server;