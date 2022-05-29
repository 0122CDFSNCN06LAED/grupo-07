const bcrypt = require('bcryptjs')

const password = 'canelina'
const hash = bcrypt.hashSync(password,10)

console.log(hash)
console.log(bcrypt.compareSync(password,hash))

console.log(typeof(hash))