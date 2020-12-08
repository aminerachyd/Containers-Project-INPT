const express = require("express");

const app = express();

app.use("/", express.static("public"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT} ...`));
