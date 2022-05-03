const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false }, 
    activationLink: { type: DataTypes.STRING }, 
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Table = sequelize.define('table', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
})

const List = sequelize.define('list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
})

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
})

const Token = sequelize.define('token', {
    refreshToken: { type: DataTypes.STRING, allowNull: false }
})

User.hasMany(Table)
Table.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Task)
Task.belongsTo(User)

Table.hasMany(List)
List.belongsTo(Table)

List.hasMany(Task)
Task.belongsTo(List)

module.exports = { User, Table, List, Task, Token }
