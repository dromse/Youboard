const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
})

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false}
})

const TableRole = sequelize.define('table_role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// User
User.hasMany(Table)
Table.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Task)
Task.belongsTo(User)

// Table
Table.hasMany(List)
List.belongsTo(Table)

List.hasMany(Task)
Task.belongsTo(List)

// Role
User.hasOne(Role)
Role.belongsTo(User)

User.hasMany(TableRole)
TableRole.belongsTo(User)

Table.hasOne(TableRole)
TableRole.belongsTo(Table)

TableRole.hasMany(Role)
Role.belongsTo(TableRole)

module.exports = { User, Table, List, Task, Token }
