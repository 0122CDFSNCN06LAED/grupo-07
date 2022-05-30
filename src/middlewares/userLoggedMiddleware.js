const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

function userLoggedMiddleware(req,res,next){
    
    let emailInCookie = req.cookies.userEmail
    
    let userFromCookie = users.find((user) => user.email == emailInCookie)
    
    if(userFromCookie){
        req.session.usuarioLogueado = userFromCookie
    }
    
    res.locals.isLogged = false

    if(req.session.usuarioLogueado){
        res.locals.isLogged = true
        res.locals.usuarioLogueado = req.session.usuarioLogueado
    }
    next()
    // console.log(req.session.usuarioLogueado);
}
module.exports = userLoggedMiddleware