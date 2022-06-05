var express= require('express');

var router=express.Router()

var cors= require('cors')

const db = require('./db.js')

router.get('/:id', db.checkVoter)

router.get('/validate/:index', db.validateVoter)

router.post('/register',db.registerVoter)

/*router.get('/:id', function(req, res){
   if(req.params.id==="30808"){
      res.json({
      "status": true,
      "data": req.params
   });
      return;
   }
   res.json({
      "status": false,
      "data": req.params
   });
});*/


//export this router to use in our index.js
module.exports = router;

