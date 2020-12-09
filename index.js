const express = require("express");
const app = express();
const mysql = require("mysql");

const fileupload = require("express-fileupload");

app.use("/", express.static("public"));

// Middlewares
app.use(express.json());
app.use(fileupload());

// Routes
app.use("/partie3", require("./routes/partie3"));

const PORT = 5000;

let con = mysql.createConnection({
  host: "mysql-container",
  user: "root",
  password: "root",
});

con.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySQL Database connected");
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT} ...`));
