// Une variable dont on se servira pour récupérer les données de notre serveur node
let data;

const retrieveData = async () => {
  const res = await axios.get("/partie3");
  data = res.data;
};

const renderData = () => {
  // On cible le tableau et on met dessus nos données
  const table = document.getElementById("table");

  // Pour chaque personnage on forme le bloc html qui le convient
  data.forEach((perso) => {
    let html = `
      <tr>
        <td>${perso.name}</td>
        <td><img src=${perso.photo} alt="" /></td>
        <td>${perso.characteristics}</td>
      </tr>
       `;
    table.innerHTML += html;
  });
};

const sendData = async () => {
  let name = document.getElementById("nom").value;
  let photo = document.getElementById("photo").files[0];
  let carac = document.getElementById("carac").value;

  let formData = new FormData();

  formData.append("photo", photo);

  formData.append("json", JSON.stringify({ name, carac }));

  const res = await axios.post("/partie3", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // FIXME Update rendering
  console.log(res.data);
  if (res) retrieveData().then(() => renderData());
};

// Récupération des données
retrieveData().then(() => renderData());

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});
