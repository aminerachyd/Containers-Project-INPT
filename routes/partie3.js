const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Donneés du fichier JSON
let initialData = require("../data/data.json");

// Route pour récuperer les données
router.get("/", (req, res) => {
  res.send(data);
});

// Route pour écrire des données dans le fichier JSON
// On retourne le nouvel objet créé
router.post("/", (req, res) => {
  const newData = ({ name, photo, characteristics } = req.body);
  initialData.push(newData);

  fs.open(
    path.resolve(__dirname, "..", "data/data.json"),
    "w+",
    (err, fileDescriptor) => {
      if (!err & fileDescriptor) {
        fs.writeFile(fileDescriptor, JSON.stringify(initialData), (err) => {
          if (!err) {
            // Fichier bien écrit
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                //Fichier bien fermé
                console.log("Bien fermé");
                res.send(newData);
              } else {
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
});

module.exports = router;
