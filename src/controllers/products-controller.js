const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const PRODUCTS = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

module.exports = {
  index: (req, res) => {
    res.render("products", {
      products: PRODUCTS,
    });
  },
  create: (req, res) => {
    res.render("product-create-form");
  },
  store: (req, res) => {
    const newId =
      PRODUCTS.reduce((acc, p) => {
        return p.id > acc ? p.id : acc;
      }, 0) + 1;
    const product = {
      ...req.body,
      id: newId
      // image: req.file.filename
    };
    PRODUCTS.push(product);
    const jsonTxt = JSON.stringify(PRODUCTS, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");
    res.redirect("/products");
  },
  edit: (req, res) => {
    const id = req.params.id
		const product = PRODUCTS.find(product => product.id == id);
		res.render('product-edit-form',{product})
  },
  update: (req,res)=>{
    const id = req.params.id
		const index = PRODUCTS.findIndex(product => product.id == id);
		Object.assign(PRODUCTS[index],{
			...req.body,
      id
		})
    console.log(req.body)
		const jsonTxt = JSON.stringify(PRODUCTS,null,2)
		fs.writeFileSync(productsFilePath, jsonTxt,'utf-8')
		res.redirect('/products')
  },
  description: (req, res) => {
    const id = req.params.id;
		const product = PRODUCTS.find(product => product.id == id);
		res.render('description',{product})
  },
  destroy: (req,res)=>{
    const id = req.params.id
		PRODUCTS.splice(PRODUCTS.findIndex(product => product.id == id),1)
		const jsonTxt = JSON.stringify(PRODUCTS,null,2)
		fs.writeFileSync(productsFilePath, jsonTxt,'utf-8')
		res.redirect('/products')
  }
};
