const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");

const db = require("../config/db");
const mysql = require("mysql");

const app = require("../index");

chai.should();

chai.use(chaiHttp);

describe("TEST : /POST Ajout d'un personnage", () => {
  it("Doit ajouter un personnage", (done) => {
    fs.readFile("test.jpg", (err, file) => {
      if (err) {
        throw err;
      } else {
        chai
          .request(app)
          .post("/partie3")
          .attach("photo", file, "naruto-test.jpg")
          .field(
            "json",
            '{"name":"Naruto du test","carac":"Carac du Naruto du test"}'
          )
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a("object");

            // On vide la base de données
            let con = mysql.createConnection(db);

            con.connect((err) => {
              if (err) {
                throw err;
              } else {
                console.log("DB connectée");
                con.query("DELETE FROM personnage", (err) => {
                  if (err) {
                    throw err;
                  } else {
                    con.end((err) => {
                      if (err) throw err;
                    });
                  }
                });
              }
            });

            done();
          });
      }
    });
  });
});

describe("TEST : /GET Liste des personnages", () => {
  it("Doit retourner la liste des personnages", (done) => {
    chai
      .request(app)
      .get("/partie3")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
