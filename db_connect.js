const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voting',
  password: 'password@321',
  port: 5432
})

// const pool = new Pool({
//   user: 'suiiyhbvtvamdk',
//   host: 'ec2-52-204-195-41.compute-1.amazonaws.com',
//   database: 'ddu7f9ipiuu4mu',
//   password: 'd4e30215109ddad350c229cc7676dbef2c242c2038d769ed94d9dc6e88ff57b1',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//  }
// })

module.exports = pool;