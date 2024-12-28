require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg"); // PostgreSQL client

// Create a connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER, // Database username
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT,
});

// Export the pool for use in other files
module.exports = pool;
