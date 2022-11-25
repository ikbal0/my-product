const express = require('express');
const router = express.Router();
const Products = require('../models/product')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const product = await Products.find().sort({_id: -1});
        return res.status(200).send(product)
    } catch (err) {
        res.json({message: 'something wrong'})
    }
})

router.post('/', async (req, res) => {
    const { name, quantity, price, description } = req.body;
    if(!req.body){
        res.status(200).send({message: 'no body'})
    } else {
        try {
            const products = new Products({
                name,
                quantity,
                price,
                description
            });
            const savedProducts = await products.save()
            res.status(200).send({savedProducts, message: 'success'})
        } catch (err) {
            res.json({message: err})
        }
    }
})

router.patch('/', async (req, res) => {
    const { _id, name, quantity, price, description } = req.body;
    if(!req.body){
        res.status(200).send({message: 'no body'})
    } else {
        try {
            const product = await Products.findById(_id)
            Object.assign(product, {
                name,
                quantity,
                price,
                description
            });
            product.save();
            res.status(200).send({body: product, message: 'success'})
        } catch (err) {
            res.json({message: err})
        }
    }
})

router.delete('/', async (req, res) => {
    const { _id } = req.body;
    if(!req.body){
        res.status(200).send({message: 'no body'})
    } else {
        try {
            const product = await Products.findById(_id)
            await product.remove();
            res.status(200).send({data: _id, message: 'success'})
        } catch (err) {
            res.json({message: err})
        }
    }
})

module.exports = router;