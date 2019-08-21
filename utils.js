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

const paginate = (results, page) => {
    const limit = 10;
    if (page < 1) {
        return [];
    }

    const startPosition = (page - 1) * limit;
    const endPosition = page * limit;
    console.log(typeof results);
    const data = results.slice(startPosition, endPosition);

    const paginateOptions = {
        currentPage: page,
        nextPage: parseInt(page, 10) + 1
    };

    return {
        data,
        paginateOptions
    };
};

module.exports = { readCSVToJSON, paginate };