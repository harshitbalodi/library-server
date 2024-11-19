import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Hall from './Hall';

const Shift = sequelize.define('Shift', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	start_time: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	end_time: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	fee: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	capacity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

Shift.belongsTo(Hall);
Hall.hasMany(Shift);

module.exports = Shift;