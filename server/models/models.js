const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define(
  'item',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brand: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, unique: true},
    img: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

const Order = sequelize.define(
  'order',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    cart: { type: DataTypes.ARRAY(DataTypes.JSON) },
    price: { type: DataTypes.INTEGER },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  Item,
  Order,
};
