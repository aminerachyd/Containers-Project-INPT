const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../config/db");
const mysql = require("mysql");
const fbStorage = require("../config/firebase");

// Route pour récuperer les données
router.get("/", (req, res) => {
  let con = mysql.createConnection(db);

  con.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log("MySQL Database connected");
      con.query("SELECT * FROM personnage", (err, result) => {
        if (err) {
          throw err;
        } else {
          con.end((err) => {
            if (!err) {
              res.send(result);
            }
          });
        }
      });
    }
  });
});

// Route pour écrire des données dans le fichier JSON
// On retourne le nouvel objet créé
router.post("/", (req, res) => {
  // Récupération des fichiers de la requete
  const photo = req.files.photo;
  const { name, carac } = JSON.parse(req.body.json);

  // TODO Ajouter un stockage cloud
  const storageRef = fbStorage.ref();

  const imagesRef = storageRef.child("images");

  let newImageRef = imagesRef.child(photo.name);

  newImageRef
    .put(photo.data)
    .then((snapshot) => {
      newImageRef
        .getDownloadURL()
        .then((imageURL) => {
          console.log(imageURL);
          const newData = {
            name: name,
            photo: imageURL,
            characteristics: carac,
          };

          // On écrit les données dans la base de données
          let con = mysql.createConnection(db);

          con.connect((err) => {
            if (err) {
              throw err;
            } else {
              console.log("MySQL Database connected");
              con.query(
                `INSERT INTO personnage(name,photo,characteristics) VALUES ('${newData.name}','${newData.photo}', '${newData.characteristics}')`,
                (err, result) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log("Query Success");
                    con.end((err) => {
                      if (!err) {
                        res.send(newData);
                      }
                    });
                  }
                }
              );
            }
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      console.error("Au niveau du put");
      throw err;
    });

  // Déplacement de l'image
  photo.mv(
    path.resolve(__dirname, "..", "public/img") + `/${photo.name}`,
    (err) => {
      if (err) {
        throw err;
      } else {
      }
    }
  );
});

module.exports = router;
