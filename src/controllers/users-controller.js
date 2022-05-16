const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// Eventualmente esto se guardará en una cookie cuando el usuario
// se loguee. 
let id = users[users.length - 1].id;
let specific_user = users.filter(user => user.id == id)[0]

module.exports = {
    
    userProfile: (req,res)=>{
        res.render("user-profile",{user:specific_user});
      },
    update: (req,res)=>{
        const id = req.params.id
        const index = users.findIndex(user => user.id == id);
        Object.assign(users[index],{
            ...req.body,
            id
        })
        const jsonTxt = JSON.stringify(users,null,2)
        fs.writeFileSync(usersFilePath, jsonTxt,'utf-8')
        res.redirect('/users/user-profile')
    },
    destroy: (req,res)=>{
        const id = req.params.id
        users.splice(users.findIndex(user => user.id == id),1)
        const jsonTxt = JSON.stringify(users,null,2)
        fs.writeFileSync(usersFilePath, jsonTxt,'utf-8')
        res.redirect('/')
    },
    store: (req,res)=>{
        const newId =
        users.reduce((acc, p) => {
        return p.id > acc ? p.id : acc;
      }, 0) + 1;
    const user = {
      ...req.body,
      id: Number(newId)
      // image: req.file.filename
    };
    users.push(user);
    const jsonTxt = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");
    res.render("user-profile",{user:user});
    }
}