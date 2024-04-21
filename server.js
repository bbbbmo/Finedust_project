const express = require("express");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
