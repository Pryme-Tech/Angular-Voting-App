const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'voting',
//   password: 'password@321',
//   port: 5432
// })

const pool = new Pool({
  user: 'suiiyhbvtvamdk',
  host: 'ec2-52-204-195-41.compute-1.amazonaws.com',
  database: 'ddu7f9ipiuu4mu',
  password: 'd4e30215109ddad350c229cc7676dbef2c242c2038d769ed94d9dc6e88ff57b1',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
 }
})

//const id = parseInt(request.params.id)

const checkVoter = (request, response) => {
  const id = request.params.id

  pool.query(`SELECT * FROM users WHERE index_number LIKE '${id}%'`, (se,d) => {
    if (se) {
      throw se
    }

    //if(d.rows > 1){

    if(d.rows.length>0){
  //response.status(200).json("success")
  response.json({
      "status": true,
      "data": d.rows
   });
    }

    else{
      //response.json("error")
       response.json({
      "status": false,
      "data": request.params
   });
    }
 // }
  })
}


const validateVoter = (request, response) => {
  const index = request.params.index

  //var s="Jerry"

  pool.query(`SELECT * FROM users WHERE index_number = '${index}'`, (se,d) => {
    if (se) {
      response.json("error")
    }

    //if(d.rows > 1){

    if(d.rows.length>0){
  //response.status(200).json("success")
  response.json({
      "status": true,
      "data": d.rows
   });
    }

    else{
      //response.json("error")
       response.json({
      "status": false,
      "data": request.params
   });
    }
 // }
  })
}

const registerVoter = (request, response) => {
  //const index = request.params.index

  //var s="Jerry"

  var name=request.body.name;
  var indexNumber=request.body.indexNumber;

  pool.query(`INSERT INTO users(fullname,index_number) VALUES('${name}','${indexNumber}')`, (se,d) => {
    if (se) {
      response.json("DatabaseError")
      return;
    }
      //response.json("error")
       response.json({
      "status": true,
      "data": request.body
   });
    
 // }
  })
}




module.exports = {
  checkVoter,
  validateVoter,
  registerVoter
  }