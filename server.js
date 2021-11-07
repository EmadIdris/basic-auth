// 'use strict';
'use strict';

// import 
const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')
const base64 = require('base-64')
const { Sequelize, DataTypes } = require('sequelize')

// prepare

const app = express()
app.use(express.json());

//For Form Auth
app.use(express.urlencoded({ extended: true }));

// connect to DB
const sequelize = new Sequelize(process.env.DATABASE_URL)


// Create a Model 
const Users = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// Route

app.post('/sign-up', signUpFunction)
app.post('/sign-in', signInFunction)

async function signUpFunction(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5)
        const record = await Users.create(req.body)
        res.status(201).json(record)
    } catch (error) {
        res.status(403).send("Error occurred");
    }
}
async function signInFunction(req, res) {
    try {
        const encodedHeaders = req.headers.authorization.split(' ')[1];
        const [username, password] = base64.decode(encodedHeaders)
        const user = await Users.findOne({ where: { username } })
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        } else {
            res.status(500).json({ 'error': 'username or password incorrect!' })
        }
    } catch (error) {
        res.status(403).send("An Error Occurred!");
    }
}

sequelize.sync().then(()=>{
    app.listen(process.env.PORT,()=> console.log('Server is Live'))
}).catch(e=>{console.log('Server is Dead',e.message)})