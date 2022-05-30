function authMiddleware(req,res,next) {
    if(req.session.usuarioLogueado){
        return res.redirect('/users/user-profile')
    }
    next()
}

module.exports = authMiddleware