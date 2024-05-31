require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: 'localhost'
    },
    console.log(`Connected to the employee_db database.`)
  )

pool.connect();

module.exports = pool;