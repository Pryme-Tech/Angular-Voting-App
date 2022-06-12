var express= require('express');
var router=express.Router()


var pool = require('./db_connect.js')

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

router.get('/',(request,response)=>{
  //res.json('hello')

  pool.query(`SELECT * FROM candidates`, (req,res)=>{

    let results = res.rows

    let xi = []

    //console.log(results)

    function voteCount(col,table,results,i){
        pool.query(`SELECT count(${col}) as ${col} FROM ${table}`,(x,y)=>{

          let eachcount = y.rows[0][col.toLowerCase()]

        xi.push({"name" : results[i].name,"category": results[i].category, "count" : eachcount,"photo" : results[i].photo })

        console.log(y.rows[0][col.toLowerCase()])
        //console.log(y.rows)
      })
      }

    for(i in results){

      //console.log(results[i])

      let col = res.rows[i].name.replace(/ /g,'');

      let table = res.rows[i].category

      voteCount(col,table,results,i);

    }

    setTimeout(()=>{
      console.log(xi)
      response.json(xi)
    },1200)

  })

})

router.get('/test',(req,res)=>{
  let data = ['President','General Secretary']

  var output = ['first']

  for(i in data){
   
      pool.query(`SELECT * FROM categories WHERE category='${data[i]}' `,(x,y)=>{

        if(x){
          console.log('x')
        }

        else{
          console.log('s')
          output.push('hello')
        }

      })
  
  }

  setTimeout(()=>{
    console.log(output)
    res.json(output)
  },1000);

  console.log(output)

})

module.exports = router;