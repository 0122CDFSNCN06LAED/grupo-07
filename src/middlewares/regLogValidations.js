const {check,body} = require('express-validator')

const validaciones = (control) => {
    if(control == 'login'){
        return [
        body('password').isLength({min: 6}).withMessage('Debe ingresar una contraseña válida de más de 6 caracteres'),
        body('email').isEmail().withMessage('Debe ingresar un email válido')]
    }
    if(control == 'register'){
        return [
        body('first_name').notEmpty().withMessage('Debe ingresar un nombre válido'),
        body('last_name').notEmpty().withMessage('Debe ingresar un apellido válido'),
        body('username').notEmpty().withMessage('Debe ingresar un usuario válido'),
        body('email').isEmail().withMessage('Debe ingresar un email válido'),
        body('password').isLength({min: 6}).withMessage('Debe ingresar una contraseña válida de más de 6 caracteres'),
        body('confirm_password').isLength({min: 6}).withMessage('Debe ingresar una contraseña válida de más de 6 caracteres'),
        body('birthdate').notEmpty().withMessage('Debe ingresar una fecha válido')]
       }
}

module.exports = validaciones
        
        
        
        
        
        