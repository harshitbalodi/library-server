import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcryptjs";


const User = sequelize.define('User', {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	hooks: {
		beforeCreate: async (user) => {
			if (user.password) {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
			}
		},
		beforeUpdate: async (user) => {
			if (user.changed('password')) {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
			}
		},
	},
});

User.prototype.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export default User;