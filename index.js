const express = require('express')

const bodyParser = require('body-parser')

var cors=require('cors');

const {sequelize,voters} = require('./models')

let port = process.env.PORT || 4000;

const routes = {
	"route1" : require('./routes/route1.js')
}

express()

.use(cors())

.use(bodyParser.urlencoded({ extended: true }))

.use(bodyParser.json({limit: '10mb'}))

.use('/',routes.route1)

.get('/users',async(req,res)=>{
	const users = await voters.findAll();
	res.json(users)
})

.get('/reset',async(req,res)=>{
	let sync = await sequelize.sync({force:true})
	console.log(sync)
	res.json('Server is live')
})

.listen(port,()=>{
	console.log(`running on port ${port}`)
})