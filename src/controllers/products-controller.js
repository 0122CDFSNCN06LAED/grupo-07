const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const PRODUCTS = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

module.exports = {
  index: (req, res) => {
    res.render("products", {
      products: PRODUCTS,
      log_flag: req.session.usuarioLogueado ? true : false
    });
  },
  create: (req, res) => {
    res.render("product-create-form",{
      log_flag: req.session.usuarioLogueado ? true : false
    });
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
    res.redirect("/products/description/"+newId);
  },
  edit: (req, res) => {
    const id = req.params.id
		const product = PRODUCTS.find(product => product.id == id);
		res.render('product-edit-form',{product: product, log_flag: req.session ? true : false})
  },
  update: (req,res)=>{
    const id = req.params.id
		const index = PRODUCTS.findIndex(product => product.id == id);
		Object.assign(PRODUCTS[index],{
			...req.body,
      id
		})
		const jsonTxt = JSON.stringify(PRODUCTS,null,2)
		fs.writeFileSync(productsFilePath, jsonTxt,'utf-8')
		res.redirect('/products/description/'+id)
  },
  description: (req, res) => {
    const id = req.params.id;
		const product = PRODUCTS.find(product => product.id == id);
		res.render('description',{product: product, log_flag: req.session ? true : false})
  },
  destroy: (req,res)=>{
    const id = req.params.id
		PRODUCTS.splice(PRODUCTS.findIndex(product => product.id == id),1)
		const jsonTxt = JSON.stringify(PRODUCTS,null,2)
		fs.writeFileSync(productsFilePath, jsonTxt,'utf-8')
		res.redirect('/products')
  }
};
