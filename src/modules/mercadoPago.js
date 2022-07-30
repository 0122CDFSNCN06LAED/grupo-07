const mercadoPago = require('mercadopago')
const credential = process.env.MP || "TEST-4360822852617723-072817-2ff24ccc63f07d574c530c2465deecbf-194873597"
let server = process.env.SERVER || "http://localhost:3000"
const feedback = `${server}/carrito/feedback`

const mp  = async (items,cuotes,shipping) => {
    try {
        mercadoPago.configure({
            access_token: credential
        })
        let config = {
            items:items,
            back_urls:{
                success: feedback,
                failure: feedback,
                pending: feedback
            },
            payment_methods:{
                installments:cuotes
            },
            auto_return: "approved",
            shipments:{
                cost: shipping,
                mode: "not_specified",
            }
        }

        let preference = await mercadoPago.preferences.create(config)

        return preference

    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mp


// curl -X POST \
// -H "Content-Type: application/json" \
// -H 'Authorization: Bearer TEST-4360822852617723-072817-2ff24ccc63f07d574c530c2465deecbf-194873597' \
// "https://api.mercadopago.com/users/test_user" \
// -d '{"site_id":"MLA"}'

// Usuario test 1
// {"id":1169756393,"nickname":"TESTJRPYHINO","password":"qatest8967","site_status":"active","email":"test_user_78583939@testuser.com"}

// Usuario test 2
// {"id":1169757347,"nickname":"TESTUC4YCFS9","password":"qatest1723","site_status":"active","email":"test_user_47375433@testuser.com"}

