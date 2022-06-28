const express = require('express')

const router = express.Router()

let endpoints = {
	"candidates" : require('../api/candidates'),
	"voters" : require('../api/voters'),
	"categories" : require('../api/categories'),
	"users" : require('../api/users'),
	"vote" : require('../api/votes'),
	"votings" : require('../api/votings'),
	"index" : require('../api/index')
}

router.use('/candidates',endpoints.candidates)

router.use('/voters',endpoints.voters)

router.use('/users',endpoints.users)

router.use('/categories',endpoints.categories)

router.use('/vote',endpoints.vote)

router.use('/votings',endpoints.votings)

router.use('/index',endpoints.index)

router.get('/',(req,res)=>{
	res.status(200).json('hiii')
})

// router.get('/',(req,res)=>{
// 	res.json('hiii')
// })

module.exports = router