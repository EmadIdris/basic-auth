'use strict';
//---------------------------------------------------------------------------------------import from folder
const { Users } = require('../models/index')
//---------------------------------------------------------------------------------------import lib
const bcrypt = require('bcrypt');
const base64 = require('base-64');
//---------------------------------------------------------------------------------------First Route (func)
const signUp = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await Users.create(req.body);
        req.record = record;
        next();
    } catch (e) { res.status(403).send("Error Creating User"); }

}
//---------------------------------------------------------------------------------------Second Route (func)
const signIn = async (req, res, next) => {
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');
    try {
        const user = await Users.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            req.user = user;
            next();
        }
        else {
            next('Invalid username & password')
        }
    } catch (error) { res.status(403).send("Invalid Login"); }
}
//---------------------------------------------------------------------------------------export My Function For Routes
module.exports = {
    signUp,
    signIn,
}