const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "./public")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/home.html"));
});
