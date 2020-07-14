var mysql = require("mysql");

var con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
