const api = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsHelp");

// GET Route for retrieving all the feedback
api.get("/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
api.post("/notes", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const makeNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(makeNote, "./db/db.json");

    const response = {
      status: "success",
      body: makeNote,
    };

    res.json(response);
  } else {
    res.json("Error saving note");
  }
});

module.exports = api;
