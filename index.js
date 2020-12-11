const express = require("express");
const app = express();
const db = require("./config/db");
const mysql = require("mysql");

const fs = require("fs");
const path = require("path");

const fileupload = require("express-fileupload");

app.use("/", express.static("public"));

// Middlewares
app.use(express.json());
app.use(fileupload());

// Routes
app.use("/partie3", require("./routes/partie3"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} ...`);

  let con = mysql.createConnection(db);

  con.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log("DB connectée");
      con.query("CREATE DATABASE IF NOT EXISTS db", (err) => {
        if (err) {
          throw err;
        } else {
          con.query("USE db;", (err) => {
            if (err) {
              throw err;
            } else {
              con.query(
                "CREATE TABLE IF NOT EXISTS personnage (id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,name varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,photo varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,characteristics text COLLATE utf8mb4_unicode_ci);",
                (err) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log("Base de données initialisée");
                    con.end((err) => {
                      if (err) throw err;
                    });
                  }
                }
              );
            }
          });
        }
      });
    }
  });
});

// For testing
module.exports = app;
