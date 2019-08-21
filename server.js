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

const server = app.listen(3000, () =>
    console.log("Server is listening on port 3000. Ready to accept requests!")
);

module.exports = server;