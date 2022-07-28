const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routes/main-routes");
const productsRouter = require("./routes/products-router");
const usersRouter = require("./routes/users-router");
const apiRouter = require("./routes/api/api-routes");
const carritoRouter = require("./routes/carrito-router.js");
const methodOverride = require("method-override");
const session = require("express-session");
const userLoggedMiddleware = require("../src/middlewares/userLoggedMiddleware");
const carritoMiddleware = require('../src/middlewares/carritoMiddleware')
const cookies = require("cookie-parser");
const cors = require("cors");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors("*"));
app.use(
  session({ secret: "secreto!", resave: false, saveUninitialized: false })
);
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(carritoMiddleware)
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/carrito", carritoRouter);
app.use("/api", apiRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.get("/", mainRouter);
