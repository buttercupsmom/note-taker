const router = require("express").Router();
const PATH = require("path");

router.get("/notes", (req, res) => {
  res.sendFile(PATH.join(__dirname, "../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(PATH.join(__dirname, "../public/index.html"));
});

module.exports = router;
