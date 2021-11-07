'use strict';
//---------------------------------------------------------------------------------------
// this file for configrution Data Base another Files in models is for schema until nows 
//---------------------------------------------------------------------------------------
require('dotenv').config();
//---------------------------------------------------------------------------------------
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
//---------------------------------------------------------------------------------------My Schema
const Users = require('./users-model')
//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------- Connection
let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
//---------------------------------------------------------------------------------------
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
//--------------------------------------------------------------------------------------- export My Function
module.exports = {
  db: sequelize,
  Users: Users(sequelize, DataTypes),
};