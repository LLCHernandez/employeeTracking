const departmentSeedData = require('./departmentSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

const fs = require('fs');
const pool = require('../../config/connection.js');

const seedQuery = fs.readFileSync('/seeding.sql', {encoding: 'utf8' })
pool.query(seedQuery, (err, res) => {
    console.log(err, res);
    console.log('Seeding Completed');
});