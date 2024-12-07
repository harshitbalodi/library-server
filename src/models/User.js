import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    authProvider: {
        type: DataTypes.ENUM('local', 'google', 'github'),
        defaultValue: 'local',
        allowNull: false
    },
    externalId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null for OAuth users
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    //     allowNull: false
    // }
}, {
    hooks: {
     beforeCreate: async (user) => {
            if (user.authProvider === 'local' && user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password') && user.authProvider === 'local') {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
    timestamps: true
});

User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;