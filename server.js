const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { readCSVToJSON } = require("./utils");
const FILE_PATH = "./assets/recipe-data.csv";

// parse application/json
app.use(bodyParser.json());

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

const server = app.listen(3000, () =>
    console.log("Server is listening on port 3000. Ready to accept requests!")
);

module.exports = server;