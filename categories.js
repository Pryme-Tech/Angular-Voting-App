var express= require('express');

let uniqid = require('uniqid')

var router=express.Router()

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voting',
  password: 'password@321',
  port: 5432
})



// Get Requests

router.get('/',(request, response) => {

  pool.query(`SELECT * FROM categories`, (se,d) => {
    if (se) {
      throw se
    }

    else{
      response.json(d.rows)
    }
 // }
  })
});

router.get('/add/:data',(request, response) => {
  const data = request.params.data;


  pool.query(`INSERT INTO categories(category) VALUES('${data}')`, (se,d) => {
    if (se) {
      throw se
    }

    else{

      const datatrim=data.replace(/ /g,'');

     
      pool.query(`SELECT * FROM categories where category='${data}' `, (x,y) => {

        if (x) {
          response.json('error')
    }

    var category_id="Cat_"+y.rows[parseInt(y.rows.length) - 1].count;

    pool.query(`UPDATE categories SET category_id='${category_id}' WHERE category='${data}' `,(a,b)=>{

      pool.query(`CREATE TABLE IF NOT EXISTS ${category_id}(indexNumber varchar(30) PRIMARY KEY )`, (c,d) => {

        if (c) {
          response.json('error')
    }

      response.json({
      "status": "inserted",
      "data": request.params.data
   })
      })

    })

      })
      

/*
      pool.query(`CREATE TABLE IF NOT EXISTS ${datatrim}(indexNumber varchar(30) )`, (x,y) => {

        if (x) {
          response.json('error')
    }

      response.json({
      "status": "inserted",
      "data": request.params.data
   })
      }) */
    }
 // }
  })
});


module.exports = router;