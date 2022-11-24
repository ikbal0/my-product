const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticationToken } = require('../middleware/auth');

router.get('/', authenticationToken, async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email});
        return res.status(200).send({
            name: user.name,
            email: user.email,
            gender: user.gender
        })
    } catch (err) {
        res.json({message: err})
    }
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({"email": email});

    if (!email){
        res.status(418).send({
            message: 'Cannot find email'
        })
    } else {
        try {
            if(await bcrypt.compare(password, checkEmail.password)){
                const user = {
                    name: checkEmail.name,
                    email: checkEmail.email,
                    gender: checkEmail.gender
                }

                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                // res.status(200).send({
                //     accessToken: accessToken,
                //     message: 'success'
                // })
                // res.cookie("token", accessToken, {
                //     httpOnly: true,
                // })
                res.cookie('name', 'geeksForGeeks')
                return res.status(200).send({ accessToken: accessToken, message: 'success' })
            } else {
                res.status(418).send({
                    message: 'Something wrong with the password!'
                })
            }
        } catch (err) {
            res.status(418).send({
                message: err
            })
        }
    }
})


router.post('/register', async (req, res) => {
    const { name, email, gender, password, cpassword } = req.body;
    const checkEmail = await User.find({"email": email});

    if (checkEmail.length !== 0 && password === cpassword){
        res.status(418).send({
            message: 'input data invalid'
        })
    } else {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                name,
                email,
                gender,
                password: hashedPassword
            });
            const savedUser = await user.save()
            res.status(200).send({savedUser, message: 'save user success'})
        } catch (err) {
            res.json({message: err})
        }
    }
})

module.exports = router;