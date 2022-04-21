const path = require("path");

module.exports = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/home.html"));
  },
  register: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  },
  description: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/description.html"));
  },
};
