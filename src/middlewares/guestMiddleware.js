function guestMiddleware(req,res,next) {
    if(!req.session.usuarioLogueado){
        return res.redirect('/users/login')
    }
    next()
}

module.exports = guestMiddleware