const path = require("path");
const db = require("../data/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const Product = require("../data/models/Product");
const { validationResult } = require("express-validator");
const productsController = require("./products-controller");

module.exports = {
    carrito: (req,res) => {
        let ids = []
        req.session.carrito.forEach(product => {
            ids.push(product.id)
        });
        db.Product.findAll({
            where: {
                id: ids
            }
        })
        .then( products => {
            const product_aux = products.map(item => item.dataValues)
            const product = product_aux.map((item, i) => Object.assign({}, item, req.session.carrito[i]));
            res.render('carrito-compras', {products: product})
        })
    },
    addCarrito: (req,res) => {
        let id = req.body.id
        if(req.session.carrito.find(item => item.id == id)){
            req.session.carrito = req.session.carrito.map(item => {
                if(item.id == id) {
                    item.quantity = item.quantity +1
                }
                return item
            })
        }else{
            req.session.carrito.push({
                id: id,
                quantity: 1
            })
        }
        let ids = []
        req.session.carrito.forEach(product => {
            ids.push(product.id)
        });
        db.Product.findAll({
            where: {
                id: ids
            }
        })
        .then( products => {
            const product_aux = products.map(item => item.dataValues)
            const product = product_aux.map((item, i) => Object.assign({}, item, req.session.carrito[i]));
            res.render('carrito-compras', {products: product})
        })
    },
    update: (req,res) => {
        if(req.body.quantity <=0){
            req.session.carrito = req.session.carrito.filter(item => item.id != req.body.id)
        }else {
            req.session.carrito = req.session.carrito.map( item => {
                if(item.id == req.body.id){
                    item.quantity = req.body.quantity
                }
                return item
            })
        }

        let ids = []
        req.session.carrito.forEach(product => {
            ids.push(product.id)
        });
        db.Product.findAll({
            where: {
                id: ids
            }
        })
        .then( products => {
            const product_aux = products.map(item => item.dataValues)
            const product = product_aux.map((item, i) => Object.assign({}, item, req.session.carrito[i]));
            res.render('carrito-compras', {products: product})
        })

    },
    delete: (req,res) => {
        req.session.carrito = req.session.carrito.filter(item => item.id != req.body.id)
        let ids = []
        req.session.carrito.forEach(product => {
            ids.push(product.id)
        });
        console.log('ids',ids);
        db.Product.findAll({
            where: {
                id: ids
            }
        })
        .then( products => {
            const product_aux = products.map(item => item.dataValues)
            const product = product_aux.map((item, i) => Object.assign({}, item, req.session.carrito[i]));
            res.render('carrito-compras', {products: product})
        })
    },
    clear: (req,res) => {
        req.session.carrito = []
        let ids = []
        req.session.carrito.forEach(product => {
            ids.push(product.id)
        });
        db.Product.findAll({
            where: {
                id: ids
            }
        })
        .then( products => {
            const product_aux = products.map(item => item.dataValues)
            const product = product_aux.map((item, i) => Object.assign({}, item, req.session.carrito[i]));
            res.render('carrito-compras', {products: product})
        })
    },
    process: (req,res) =>{
        res.redirect('/')
    }
}