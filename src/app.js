const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routes/main-routes");
const productsRouter = require("./routes/products-router");
const usersRouter = require("./routes/users-router");
const methodOverride = require("method-override");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({ secret: "secreto!", resave: false, saveUninitialized: false })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.get("/", mainRouter);
