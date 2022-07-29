const express = require("express");
const router = express.Router();

const apiUsersController = require("../../controllers/api/api-users-controller");
const apiProductsController = require("../../controllers/api/api-products-controller");
const apiCategoriesController = require("../../controllers/api/api-categories-controller");

router.get("/users/", apiUsersController.list);
router.get("/users/:id", apiUsersController.show);

router.get("/products/", apiProductsController.list);
router.get("/products/:id", apiProductsController.show);

router.get("/categories/", apiCategoriesController.list);
router.get("/categories/detail", apiCategoriesController.detail)
module.exports = router;
