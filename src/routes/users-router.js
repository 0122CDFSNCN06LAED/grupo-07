const { Router } = require("express");
const router = Router();
const path = require('path')
const multer = require('multer')
const userController = require("../controllers/users-controller");
const regLogMiddelware = require('../middlewares/regLogValidations')

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname,'../public/img/user-img'))
    },
    filename: (req,file,cb) => {
        const newFileName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})
const upload = multer({storage: storage})

// Loguear un usuario
router.get("/login", userController.login);
router.post('/login',regLogMiddelware('login'),userController.processLogin)

// Desloguear un usuario
router.get('/logout', userController.logout)

/*** GET AN USER ***/
router.get("/user-profile" ,userController.userProfile);

/*** EDIT AN USER ***/
router.put("/:id", userController.update);

/*** DELETE AN USER ***/
router.delete('/:id', userController.destroy);

/*** CREATE AN USER ***/
router.get("/register", userController.register);
router.post('/register',upload.single('profile_pic'),regLogMiddelware('register'),userController.store);



module.exports = router;