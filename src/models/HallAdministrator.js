import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Hall from "./Hall";

const HallAdministrator = sequelize.define('HallAdministrator', {
	role: {
		type: DataTypes.ENUM('ADMIN', 'MANAGER', 'VIEWER'),
		defaultValue: 'VIEWER',
		allowNull: false
	},
	assignedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
}, {
	// Prevent duplicate entries for user-hall combination
	indexes: [
		{
			unique: true,
			fields: ['userId', 'hallId']
		}
	]
});

// Associations
User.belongsToMany(Hall, { 
	through: HallAdministrator,
	foreignKey: 'userId',
	as: 'ManagedHalls'
});

Hall.belongsToMany(User, { 
	through: HallAdministrator,
	foreignKey: 'hallId',
	as: 'Administrators'
});

HallAdministrator.belongsTo(User, { foreignKey: 'userId' });
HallAdministrator.belongsTo(Hall, { foreignKey: 'hallId' });

export default HallAdministrator;