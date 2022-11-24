
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const CookieParser = require('cookie-parser');
require("dotenv/config")
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
const app = express();
const PORT = '8080';

app.use(CookieParser());
app.use(express.json());
app.use(cors(corsOptions));

const userRoute = require('./routes/user');
const productRoute = require('./routes/product');

const { default: mongoose } = require('mongoose');
const { authenticationToken } = require('./middleware/auth');

app.use('/user', userRoute)
app.use('/product', authenticationToken, productRoute)

mongoose.connect(process.env.MONGODB_URI, () => console.log('connect to mongodb!'))

app.listen(
    PORT,
    () => console.log(`server is online on http://localhost:${PORT}`)
)