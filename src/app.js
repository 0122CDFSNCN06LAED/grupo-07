const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routes/main-routes");

app.use(express.static(path.join(__dirname, "public")));
app.use(mainRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
app.get("/", mainRouter);
