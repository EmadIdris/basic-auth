'use strict';
//--------------------------------------------------------------------------------------- Here My Schema 
// create table User Values(username varchar(255) notNull , password varchar(255) notNull) into lab6
// Hello I'm Emad Idris
const Users = (sequelize, DataTypes) => sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
//---------------------------------------------------------------------------------------export My Function
module.exports = Users;