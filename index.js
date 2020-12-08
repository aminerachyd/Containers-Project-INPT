const express = require("express");
const app = express();

const fileupload = require("express-fileupload");

app.use("/", express.static("public"));

// Middlewares
app.use(express.json());
app.use(fileupload());

// Routes
app.use("/partie3", require("./routes/partie3"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT} ...`));
