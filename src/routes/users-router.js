const { Router } = require("express");
const router = Router();
const userController = require("../controllers/users-controller");

/*** GET AN USER ***/
router.get("/user-profile", userController.userProfile);

/*** EDIT AN USER ***/
router.put("/:id", userController.update);

/*** DELETE AN USER ***/
router.delete('/:id', userController.destroy);

/*** CREATE AN USER ***/
router.post('/',userController.store);

module.exports = router;