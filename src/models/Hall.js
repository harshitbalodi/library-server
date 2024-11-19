import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Hall = sequelize.define('Hall', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = Hall;