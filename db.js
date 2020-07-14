const config = require("./config");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
