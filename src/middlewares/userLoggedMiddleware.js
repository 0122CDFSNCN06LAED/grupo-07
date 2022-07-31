const db = require("../data/models");


const userLoggedMiddleware = async (req,res,next) => {
    try{
        const users = await db.User.findAll()

        let emailInCookie = req.cookies.userEmail

        if(emailInCookie){
            let userFromCookie = users.find((user) => user.email == emailInCookie)

            if(userFromCookie){
                req.session.usuarioLogueado = userFromCookie
            }
        }


        if(req.session.usuarioLogueado){
            res.locals.isLogged = true
            res.locals.usuarioLogueado = req.session.usuarioLogueado
        }
        next()
    }
    catch (error) {
        console.log('error',error);
    }
}


module.exports = userLoggedMiddleware