import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Desk from './Desk';

const Student = sequelize.define('Student', {
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	gender: {
		type: DataTypes.ENUM('Male', 'Female', 'Other'),
		allowNull: false,
	},
	mobile_no: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	is_expired: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	valid_upto: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

Student.belongsTo(Desk);
Desk.hasOne(Student);

module.exports = Student;