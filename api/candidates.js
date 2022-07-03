const express = require('express')

const router = express.Router()

const fs = require('fs')

// var cors = require('cors')

// router.use(cors())

const {candidates,categories} = require('../models')

// router.get('/',(req,res)=>{
// 	candidates.findAll
// })

router.post('/add',async(req,res)=>{

	try{
		let {candidatename,category,votingname,user_id,avatar} = req.body

		if (!(candidatename && category && votingname && user_id && avatar)) {
      return res.status(400).json("All input is required");
    }

    	let imageData=''
	let imageExtension=''
	let filename

	if(avatar.includes('data:image')){
	
	imageData = avatar.replace(/^data:image\/\w+;base64,/, '');

	imageExtension = avatar.split(';')[0].split('/')[1];

	console.log(imageExtension)

	filename = `assets/img/candidates/${candidatename} ${category} ${user_id} ${votingname}.${imageExtension}`

	fs.writeFileSync(filename,imageData,{encoding: 'base64'})

	filename = filename.replace('assets/','')
	
}

else{
	return res.status(409).json("Error! Try a differant image")
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
		 const addCandidate = await candidates.create({candidatename,category,votingname,user_id,avatar:filename})
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