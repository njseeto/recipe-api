# Recipe API

### What does this API do?

This API has a csv file that outlines 17 recipes.
The API allows the user to do 3 things:

- Fetch a recipe by its ID
- Fetch a recipe by its cuisine
- Update one or more fields in the recipe

### How to use this API

## Requirements

This application runs in Node. Please ensure you have Node installed on your machine.

## How to run this application

Clone the repo

Then install npm dependencies by running:

`npm i`

To run the server, from the root run:

`npm run start`

The server should start running on port 3000.

### How to run tests

This application uses jest and supertest for testing.
To run the tests, from the root run the command:

`npm run test`

## What example requests can I make?

To get a recipe by its ID:
Note IDs are from 1 to 17, inclusive.

`GET`

`curl 'http://localhost:3000/recipe/:id'`

To get a recipe by its CUISINE:

This paginates the results, with a maximum of 10 recipes per page.

Valid cuisines are asian, british, italian, mexican and mediterranean.

Note to see pagination use british cuisine as there are 11 recipes that fit this criteria.

`GET`

`curl 'http://localhost:3000/recipe/cuisine/:cuisine/?page=1'`

To UPDATE recipe fields:

`PATCH`

`curl --request PATCH --url http://localhost:3000/recipe/:id --header 'content-type: application/json' --data '{ "key" : "value", "key" : "value" }'`

The keys that can be updated include:

- id
- created_at
- updated_at
- box_type
- title
- slug
- short_title
- marketing_description
- calories_kcal
- protein_grams
- fat_grams
- carbs_grams
- bulletpoint1
- bulletpoint2
- bulletpoint3
- recipe_diet_type_id
- season
- base
- protein_source
- preparation_time_minutes
- shelf_life_days
- equipment_needed
- origin_country
- recipe_cuisine
- in_your_box
- gousto_reference

### Improvements

- Better unit testing - mocking the csv to json library for example.
- A function that overwrites the csv file with the updated recipe fields following a successful patch request.
- Better error handling and testing around error handling. Some improvements could include:
    - Handling valid characters being passed in the urls require an ID/string.
    - Check keys are valid for the patch request.

- Add extra routes, POST to add new recipes and DELETE to delete recipes.
- Could have done a bit more research into csv to JSON parser libraries available.
- Better setting out of application, such as having router and handler files.

### Other things
- Unfortunately there is no test for the patch route - I was unable to find an elegant solution for testing this route with Supertest. This route was tested via [Insomia](https://insomnia.rest/)