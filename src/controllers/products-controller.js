const path = require("path");
const db = require('../data/models')
const sequelize = db.sequelize
const {Op} = require('sequelize')
const moment = require('moment');
const Product = require("../data/models/Product");


module.exports = {
  index: (req, res) => {
    db.Product.findAll()
    .then(product => {
        res.render('products', {products: product})
    })
  },
  create: (req, res) => {
    res.render("product-create-form");
  },
  store: (req, res) => {
    db.Product.create({
        brand: req.body.brand,
        model: req.body.model,
        manufacture_year: req.body.manufacture_year,
        color: req.body.color,
        door_number: req.body.door_number,
        transmission: req.body.transmission,
        motor_type: req.body.motor_type,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount
    })
    .then(() => {
        return res.redirect('/')
    })
    .catch(error => res.send(error))
  },

  edit: (req, res) => {
    const id = req.params.id
    const product = db.Product.findByPk(id)
    product.then(product => {
        res.render('product-edit-form',{product: product})
    })
	
  },
  update: (req,res)=>{
    const id = req.params.id
    db.Product.update({
        brand: req.body.brand,
        model: req.body.model,
        manufacture_year: req.body.manufacture_year,
        color: req.body.color,
        door_number: req.body.door_number,
        transmission: req.body.transmission,
        motor_type: req.body.motor_type,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount
    },
    {
        where: {id: id}
    })
    .then(() => {
        return res.redirect('/')
    })
    .catch(error => res.send(error))

		
  },
  description: (req, res) => {
    const id = req.params.id;
	const product = db.Product.findByPk(id)
    .then(product => {
        res.render('description',{product: product})
    })
    
	
  },
  destroy: (req,res)=>{
    const id = req.params.id
    db.Product.destroy(
        {
            where: {
                id: id
            },
            force: true
        }
    )
    .then(() => {
        return res.redirect('/')
    })
    .catch(error => {
        res.send(error)
    })
  }
};
