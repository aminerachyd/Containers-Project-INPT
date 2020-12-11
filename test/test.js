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
    const json = {
      name: "Naruto du test",
      carac: "Carac du naruto du test",
    };

    chai
      .request(app)
      .post("/partie3")
      .attach("photo", fs.readFileSync("naruto-test.jpg"), "naruto-test.jpg")
      .send(json)
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
