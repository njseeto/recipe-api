const fs = require("fs");
const csvjson = require("csvjson");
// promisify is a tool in the util module that transforms a callback function into a promise
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const readCSVToJSON = async filePath => {
    const options = {
        quote: '"'
    };
    const fileContent = await readFile(filePath, "utf-8");
    return csvjson.toObject(fileContent, options);
};


module.exports = { readCSVToJSON };