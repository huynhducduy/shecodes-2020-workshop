const config = require("./config");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to mysql at ${config.username}@${config.host}:3306!`);
});

module.exports = con;
