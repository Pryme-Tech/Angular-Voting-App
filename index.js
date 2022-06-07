var express=require('express');

var cors=require('cors');

const bodyParser = require('body-parser')

var check = require('./checkvoter.js');

var categories = require('./categories.js');

var candidates = require('./candidates.js');

var getvotes = require('./getvotes.js');

const db = require('./db.js')

let port = process.env.PORT || 4000;

express()

.use(bodyParser.urlencoded({ extended: true }))

.use(bodyParser.json({limit: '10mb'}))

.use(express.static('public'))

.use('/images' , express.static('images'))

/*
.use(express.static('./'))

.use('/' , express.static('/'))
*/

.use(cors())

.use('/checkvoter', check )

.use('/categories', categories )

.use('/candidates', candidates )

.use('/getvotes' , getvotes)

.post('/',(req,res)=>{

	res.json(req.body)

})

.listen(port,console.log(`running on port ${port} `))


