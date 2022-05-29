const {body} = require('express-validator')

const validaciones = (control) => {
    if(control == 'login'){
        return [
        body('login_email').notEmpty().withMessage('Debe ingresar un nombre válido la concha de tu madre'),
        body('login_password').notEmpty().withMessage('Debe ingresar un apellido válido'),
        body('email').isEmail().withMessage('Debe ingresar un email válido')]
    }
    if(control == 'register'){
        return [
        body('first_name').notEmpty().withMessage('Debe ingresar un nombre válido'),
        body('last_name').notEmpty().withMessage('Debe ingresar un apellido válido'),
        body('username').notEmpty().withMessage('Debe ingresar un usuario válido'),
        body('email').isEmail().withMessage('Debe ingresar un email válido'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña válida'),
        body('confirm_password').notEmpty().withMessage('Debe ingresar una contraseña válida'),
        body('birthdate').notEmpty().withMessage('Debe ingresar una fecha válido')]
       }
}

module.exports = validaciones
        
        
        
        
        
        