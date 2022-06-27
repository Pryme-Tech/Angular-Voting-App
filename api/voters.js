const express = require('express')

const { voters,users } = require('../models')

var cors = require('cors')

router.use(cors())

const router = express.Router()

router.post('/register',async (req,res)=>{
	const { name,index,user_id } = req.body

	let register = await voters.create({index,name,user_id})

	res.json({
      "status": true,
      "data": req.body
   });
})

module.exports = router