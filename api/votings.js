const express = require('express')

const { voting,users } = require('../models')

const router = express.Router()

var cors = require('cors')

router.use(cors())

router.get('/:user',async (req,res)=>{

	let check = await voting.findAll({
		where:{
			username:req.params.user
		}
	})
	.then(function(votings){
     res.json(votings)
	},

	function(err){
		res.json("No Voting Created")
	}
)


})



router.post('/add',async(req,res)=>{

	try{
		// Take user input
		let {newVotingInput,user} = req.body

		// Validate user input
    if (!(newVotingInput && user)) {
      return res.status(400).json("All input is required");
    }

		let validateUser=await users.findOne({
		where:{
			username:user
		}
	})

		if(validateUser){

			let checkIfVotingExists = await voting.findOne({
				where:{
					votingname:newVotingInput
				}
			})

			if(checkIfVotingExists){
				return res.status(409).json("Voting already exists. Please Create a new Voting")
			}

			let createVoting = await voting.create({
			votingname:newVotingInput,
			username:user
		})

			if(createVoting){

			res.status(200).json("Voting Created Successfully")
		}
		else{
			res.status(400).json("Voting already exists")
		}

		}

		else{
			res.status(401).json("Unauthorized access")
		}


	}
	catch (err){
		console.log(err)
	}

})

router.get('/',async(req,res)=>{

	try{
		let Ongoing = await voting.findAll()

		if(Ongoing.length < 1){
			return res.status(404).json("No Ongoing Votes at the moment")
		}

		res.status(200).json(Ongoing)
	}
	catch (err){
		console.log("err")
		res.json.status(404).("An Error Occured")
	}
})

module.exports = router