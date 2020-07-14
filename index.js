const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");
const db = require("./db");
const s3 = require("./s3");
const config = require("./config");

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

app.get("/add", (req, res) => {
  res.render("add");
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.awsS3BucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});

app.post("/add", upload.single("thumbnail"), (req, res, next) => {
  db.query(
    `INSERT INTO \`blogs\`(title, description, content, thumbnail) VALUES ("${req.body.title}","${req.body.description}","${req.body.content}","${req.file.location}")`,
    function (err, result) {
      if (err) throw err;
      res.redirect("/blogs");
    }
  );
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
