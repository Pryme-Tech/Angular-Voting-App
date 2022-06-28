const express = require('express')

const { voters,users } = require('../models')

var cors = require('cors')

const router = express.Router()

router.use(cors())

router.get('/',(req,res)=>{
	res.json('index working')
})

module.exports = router