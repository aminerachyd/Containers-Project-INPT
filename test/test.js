// TODO Have to make tests now
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const path = require("path");
const fs = require("fs");

const app = require("../index");

const should = chai.should();

chai.use(chaiHttp);

describe("TEST : /POST Ajout d'un personnage", () => {
  it("Doit ajouter un personnage", (done) => {
    const file = fs.readFileSync("test.jpg");

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

        fs.close(file, (err) => {
          if (err) {
            throw err;
          } else {
            done();
          }
        });
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
