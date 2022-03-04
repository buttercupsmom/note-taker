const api = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsHelp");

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

// delete
api.delete("/notes/:id", (req, res) => {
  const notesId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const answers = json.filter((note) => note.id !== notesId);

      writeToFile("./db/db.json", answers);

      res.json(`${notesId} deleted.`);
    });
});

module.exports = api;
