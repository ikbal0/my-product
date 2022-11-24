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
        console.log(req.body)
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

module.exports = router;