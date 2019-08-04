const Pool = require('pg').Pool

const pool = new Pool({
  user: 'stockx',
  host: 'localhost',
  database: 'stockx',
  password: 'stockx',
  port: '5432'
})

module.exports = pool
