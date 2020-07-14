const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = process.env.PORT || "8000";

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/blogs", (req, res) => {
  db.query("SELECT * FROM `blogs`", function (err, result) {
    if (err) throw err;
    res.render("blogs", { blogs: result });
  });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
