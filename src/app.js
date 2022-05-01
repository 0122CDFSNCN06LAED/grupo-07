const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routes/main-routes");
const productsRouter = require("./routes/products-router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(mainRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.get("/", mainRouter);
app.use("/products", productsRouter);
