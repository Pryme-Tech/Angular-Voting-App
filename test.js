var express=require ('express');

var uniqid=require('uniqid')

//var u=uniqid()

express()

.get('/',(req,res)=>{
	res.json(uniqid('Candidate_'))
})

.listen(4000,()=>{
	console.log('hel')
})