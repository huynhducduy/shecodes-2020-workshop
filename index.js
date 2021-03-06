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
  db.query("SELECT * FROM `blogs` ORDER BY `id` DESC", function (err, result) {
    if (err) throw err;
    res.render("index", { blogs: result });
  });
});

app.get("/:id(\\d+)", (req, res) => {
  db.query("SELECT * FROM `blogs` WHERE `id` = " + req.params.id, function (
    err,
    result
  ) {
    if (err) throw err;
    if (result.length == 0) res.redirect("/");
    res.render("blog", { blog: result[0] });
  });
});

app.get("/write", (req, res) => {
  res.render("write");
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

app.post("/write", upload.single("thumbnail"), (req, res, next) => {
  db.query(
    `INSERT INTO \`blogs\`(title, description, content, thumbnail) VALUES ("${req.body.title}","${req.body.description}","${req.body.content}","${req.file.location}")`,
    function (err, result) {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
