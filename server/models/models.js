import sequelize from '../db'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
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

User.hasMany(Table)
Table.hasMany(User)

Table.hasMany(List)
List.hasOne(Table)

List.hasMany(Task)
Task.hasOne(List)

export default { User, Table, List, Task }
