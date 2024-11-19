// src/models/Desk.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Shift from './Shift.';

const Desk = sequelize.define('Desk', {
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_vacant: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  seat_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Desk.belongsTo(Shift);
Shift.hasMany(Desk);

module.exports = Desk;