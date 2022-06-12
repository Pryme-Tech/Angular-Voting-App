var express=require ('express');

var uniqid=require('uniqid')

var x = require('./db_connect.js')

//var u=uniqid()

express()

.get('/',(req,res)=>{
	res.json(x)
})

.listen(4000,()=>{
	console.log('hel')
})