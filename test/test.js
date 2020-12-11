// TODO Have to make tests now
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const app = require("../index");

const should = chai.should();

chai.use(chaiHttp);

describe("/POST Ajout d'un personnage", () => {
  if (
    ("Doit ajouter un personnage",
    (done) => {
      chai
        .request(app)
        .post("/partie3")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    })
  );
});

describe("/GET Liste des personnages", () => {
  it("Should return 2", () => assert.equal(1 + 1, 2));
});
