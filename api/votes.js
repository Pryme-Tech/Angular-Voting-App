const express = require('express')

const { votes,users,candidates,categories } = require('../models')

var cors = require('cors')

router.use(cors())

const router = express.Router()

router.post('/',async (req,res)=>{
	const data = req.body

	let keys = []

	// let data = req.body

	for(key in data){
		if(key==="user_id" || key==='votingname'){
			continue;
		}

		let user_id = data['user_id'];

	// let checkCandidateExists = await candidates.findAll({
	// 	where: {
	// 		name : data[key],
	// 		category: key
	// 	}
	// })	
		let push = await votes.create({user_id,candidate:data[key],category:key,votingname:data['votingname']})
		keys.push(push)
	}

	res.json("Voting Successfully Created");
})

router.get('/:user_id/:votingname',async (req,res)=>{
	
	try{

		let { user_id,votingname } = req.params

		let allCandidates = await candidates.findAll({
			where:{
				user_id,votingname
			}
		})

		let c = []

		let countAllVotes = await votes.count({
				where:{
					user_id,votingname
				}
			})

		for(index in allCandidates){
			

			let countVotes = await votes.count({
				where:{
					candidate : allCandidates[index].candidatename,
					user_id,votingname
				}
			})

			c.push({
				"Candidate_Name" : allCandidates[index].candidatename,
				"Category" : allCandidates[index].category,
				"Percentage" : ((countVotes/countAllVotes) * 100).toFixed(2),
				"Number_of_votes" : countVotes,
				"Total_Votes" : countAllVotes
			})
		}

		res.json(c)

	}

	catch (err){
		console.log(err)
	}

	// let allCandidates = await candidates.findAll({
	// 	where:{
	// 		user_id: req.params.user_id
	// 	}
	// })

	// let allUsersDetailsWithVotes = []

	//   for(key in allCandidates){

	// 	let countVotes = await votes.count({
	// 	where:{
	// 		user_id : req.params.user_id,
	// 		candidate : allCandidates[key].name,
	// 		category : allCandidates[key].category
	// 	}
	// })

	//  	await allUsersDetailsWithVotes.push({ 
	//  		"Name" : allCandidates[key].name,
	//  		"Category" : allCandidates[key].category,
	//  		"Votes" : countVotes
	//  	})

	//   }

	//  res.json(allUsersDetailsWithVotes)
})

module.exports = router