const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Donneés du fichier JSON
try {
  let currentData = require("../data/data.json");
} catch (error) {
  currentData = [];
}

// Route pour récuperer les données
router.get("/", (req, res) => {
  res.send(currentData);
});

// Route pour écrire des données dans le fichier JSON
// On retourne le nouvel objet créé
router.post("/", (req, res) => {
  // Récupération des fichiers de la requete
  const photo = req.files.photo;
  const { name, carac } = JSON.parse(req.body.json);

  photo.mv(
    path.resolve(__dirname, "..", "public/img") + `/${photo.name}`,
    (err) => {
      if (err) {
        throw err;
      } else {
        // const newData = ({ name, photo, characteristics } = req.body);
        const newData = {
          name: name,
          photo: "../img/" + photo.name,
          characteristics: carac,
        };
        currentData.push(newData);
        writeData(res, currentData);

        res.send(newData);
      }
    }
  );
});

// La mini persistance de données
const writeData = (res, data) => {
  fs.open(
    path.resolve(__dirname, "..", "data/data.json"),
    "w+",
    (err, fileDescriptor) => {
      if (!err & fileDescriptor) {
        fs.writeFile(fileDescriptor, JSON.stringify(data), (err) => {
          if (!err) {
            // Fichier bien écrit
            fs.close(fileDescriptor, (err) => {
              if (err) {
                // Erreur dans la fermeture du fichier
                console.log(err);
                res.status(500).send("Server error");
              }
            });
          } else {
            // Erreur dans l'ecriture du fichier
            console.log(err);
            res.status(500).send("Server error");
          }
        });
      } else {
        // Une erreur d'ouverture du fichier
        console.log(err);
        res.status(500).send("Server error");
      }
    }
  );
};

module.exports = router;
