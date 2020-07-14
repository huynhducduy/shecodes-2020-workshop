const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || "8000";

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
