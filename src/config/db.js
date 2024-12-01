import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Explicitly add the port
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 10000, // 10 seconds
      // SSL configuration for cloud databases
      ssl: {
        rejectUnauthorized: false // Use carefully, only for testing
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Increased timeout for connection
      idle: 10000
    }
  }
);

// Add a more detailed connection test
try {
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
  console.log('Connection details:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
  console.error('Detailed error:', {
    message: error.message,
    name: error.name,
    original: error.original
  });
}

export default sequelize;