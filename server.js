const express = require("express");
// calling the index and notes html
const htmlRoutes = require("./routes/htmlRoutes");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(express.static("public"));
// using index and notes html

app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log("Listening on port. ", PORT);
});

module.exports = app;
