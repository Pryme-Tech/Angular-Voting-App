const express = require('express')

const router = express.Router()

const {candidates,categories} = require('../models')

// router.get('/',(req,res)=>{
// 	candidates.findAll
// })

router.post('/add',async(req,res)=>{

	try{
		const {candidatename,category,votingname,user_id} = req.body

		if (!(candidatename && category && votingname && user_id)) {
      return res.status(400).json("All input is required");
    }

	const checkIfCandidateExists = await candidates.findOne({
		where:{
		   category, 
		   candidatename,
		   votingname,
		   user_id
		}
	})

	if(checkIfCandidateExists){
		return res.status(400).json("Candidate already exists under this category")
	}

	else{
		 const addCandidate = await candidates.create({candidatename,category,votingname,user_id})
		 res.status(200).json("Candidate Created Successfully")
		// msg = "Candidate Created Successfully"
	}
	
}
catch (err){
	console.log(err)
}

})


router.get('/:user_id/:votingname',async(req,res)=>{
	try{
		let {user_id,votingname} = req.params

		let data = await candidates.findAll({
			where:{
				user_id,
				votingname
			}
		})

		res.status(200).json(data)
	}
	catch (err){
		console.log(err)
	}
})

module.exports = router