import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Student from './Student';

const Payment = sequelize.define('Payment', {
	date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	fee: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	payment_method: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	paid_for_month: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

Payment.belongsTo(Student);
Student.hasMany(Payment);

module.exports = Payment;