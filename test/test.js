// TODO Have to make tests now
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const path = require("path");
const fs = require("fs");

const app = require("../index");

const should = chai.should();

chai.use(chaiHttp);

describe("/POST Ajout d'un personnage", () => {
  it("Doit ajouter un personnage", (done) => {
    chai
      .request(app)
      .post("/partie3")
      .attach("photo", fs.readFileSync("test.jpg"), "naruto-test.jpg")
      .field(
        "json",
        '{"name":"Naruto du test","carac":"Carac du Naruto du test"}'
      )
      // .field("json", json)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        done();
      });
  });
});

describe("/GET Liste des personnages", () => {
  it("Doit retourner la liste des personnages", (done) => {
    chai
      .request(app)
      .get("/partie3")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        done();
      });
  });
});

describe("Dummy test", () => {
  it("Should return 2", () => assert.equal(1 + 1, 2));
});
