var express= require('express');
let fs=require('fs')
let mime=require('mime')
let uniqid = require('uniqid')

var router=express.Router()

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
  port: 5432
})

//Post requests

router.post('/add/candidate',(req,res)=>{

  
  //res.json(req.body);

  var name=req.body.name
  var photo=req.body.photo
  var category=req.body.category

  var data=photo.replace(/^data:image\/\w+;base64,/, '');

  var extension=photo.split(';')[0].split('/')[1];

  var fileName=`public/images/candidates/${name}.${extension}`;

  if(photo.includes('data:image')){

  fs.writeFileSync(fileName,data,{encoding: 'base64'});

  fileName=fileName.replace('public','');

}

else{
  fileName='';
}

  //res.json(extension)

  pool.query(`SELECT category_id FROM categories WHERE category='${category}' `,(x,y)=>{

    let category_id = y.rows[0].category_id

    pool.query(`INSERT INTO candidates(name,photo,category,candidate_id) VALUES('${name}','${fileName}','${category_id}','${uniqid('Can_')}')`, (se,d) => {
    if (se) {
      res.json("DatabaseError")
      return;
    }
      else{

        var nametrim=name.replace(/ /g,'');

         pool.query(`ALTER TABLE ${category_id} ADD ${nametrim} int`, (x,y) => {

          if(x){
           // res.json(category);
          }

       res.json({
      "status": true,
      "data": req.body
   });
       })

     }
    
 // }
  })

  })

})

router.post('/update/candidate',(req,res)=>{

  var name=req.body.name
  var photo=req.body.photo
  var category=req.body.category

  pool.query(`UPDATE candidates SET photo='${photo}' WHERE name='${name}'`, (se,d) => {
    if (se) {
      res.json("DatabaseError")
      return;
    }
      //response.json("error")
      else{

        var categorytrim=category.replace(/ /g,'')

        var nametrim=name.replace(/ /g,'');
        //nametrim=nametrim.replace(/\//g,'');

        res.json({
      
      "status": true,
      "data": d.rows//req.body
   });

/*
        pool.query(`ALTER TABLE ${categorytrim} RENAME COLUMN ${nametrim} TO  int`, (x,y) => {

          if(x){
            res.json(category);
          }

       
       })
       */

     }
    
 // }
  })

})


//Vote requests

router.post('/vote',(req,res)=>{

  var data=req.body;

  let success = []

  let msg = "Voting Successful"

  //Check if user voting is already voted

  pool.query(` SELECT * FROM users WHERE index_number = '${data['indexNumber']}' `,(u,i)=>{
    if(i.rows.length > 0){
      res.json("Sorry!!! you've already voted, double voting isn't allowed.")
      return
    }

else{
  for(var key in data){

    if(key==="indexNumber"){
      continue
    }

    // Declare Variable to hold each value data
    let values=[]

    // Push Data to values array
    values.push(data[key])

    // Make Query Request to find out whether the following exists, since we'll be needing some
    // 1. Find out the category_id which the where clause goes to the category

    /*** N.B?? Each Data from vote requests has a key which is exactly the same in the categoty table so we write our query to find out what the
     * Category_id of each request key in category is, the category_id columns are also all tables. That's where we know which table to insert 
     * data.
     * ***/ 

    /** This query searches for the table names in the category table
     * which is the category_id column
     * **/

    pool.query(`SELECT category_id FROM categories WHERE category='${key}' `,(err,suc)=>{

     suc.rows.forEach((each,index)=>{

      let v = values[index].replace(/ /g,'');

      /**
       * This query inserts into each table 
       * which is the category_id of category table
       * **/

       let a = data['indexNumber']

       pool.query(`INSERT INTO ${each.category_id}(indexnumber,${v}) VALUES('${data['indexNumber']}',1)`, (e,s) => {

        if(e){
          return
        }

       pool.query(`UPDATE users SET voted='YES' WHERE index_number='${a}' `,(x,y)=>{

        if(x){
          return
        }

        //success.push("Vote Successfull")

       })

     }) 

     })


    })
    
  }
  res.json(msg)
}

    })

  //res.json(msg)

})

router.get('/',(request, response) => {

  pool.query(`SELECT * FROM candidates`, (se,d) => {
    if (se) {
      throw se
    }

    else{
      response.json(d.rows)
    }
 // }
  })
});

router.get('/del/:data/:category',(request, response) => {

  var data=request.params.data
  var category=request.params.category
  var categorytrim=category.replace(/ /g,'')
  var datatrim=data.replace(/ /g,'')

  pool.query(`DELETE FROM candidates WHERE name='${data}' `, (a,b) => {
    if (a) {
      throw a
    }

    pool.query(`SELECT category_id FROM categories WHERE category='${category}' `,(d,f)=>{
       let category_id=f.rows[0].category_id

       pool.query(`ALTER TABLE ${category_id} DROP COLUMN ${datatrim}`, (c,d) => {
    if (c) {
      //throw c
    }
    else{
      response.json(`${data} Deleted Successfully !!!`)
    }
  })
    })
    

   /* pool.query(`ALTER TABLE ${categorytrim} DROP COLUMN ${datatrim}`, (c,d) => {
    if (c) {
      //throw c
    }
    else{
      response.json(`${data} Deleted Successfully !!!`)
    }
  }) */

    //else{
    //  response.json("success")
    //}
 // }
  })
});

router.get('/d/:e',(req,res) => {
  res.json(req.params.e)
})

router.post('/test',(req,res)=>{
 // res.json(req.body)

 x = []

  for(key in req.body){
  
    pool.query(`SELECT * FROM categories WHERE category='${req.body[key]}'` , (a,b)=>{

      if(a){
        throw a
      }

      if(b){
        x.push('hello')
      }
    })
  }

  res.json(x)

})

module.exports = router;