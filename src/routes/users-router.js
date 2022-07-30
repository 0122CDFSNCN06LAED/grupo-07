const { Router } = require("express");
const router = Router();
const path = require('path')

const userController = require("../controllers/users-controller");
const regLogMiddelware = require('../middlewares/regLogValidations')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer')

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
router.get("/login", authMiddleware,userController.login);
router.post('/login',regLogMiddelware('login'),userController.processLogin)

// Desloguear un usuario
router.get('/logout', userController.logout)

/*** GET AN USER ***/
router.get("/user-profile" ,guestMiddleware,userController.userProfile);

/*** EDIT AN USER ***/
router.put("/:id",upload.single("image") ,userController.update);

/*** DELETE AN USER ***/
router.delete('/:id', userController.destroy);

/*** CREATE AN USER ***/
router.get("/register", authMiddleware,userController.register);
router.post('/register',upload.single('profile_pic'),regLogMiddelware('register'),userController.store);



module.exports = router;