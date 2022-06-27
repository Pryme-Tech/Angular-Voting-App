const express = require('express')
const router = express.Router()

const {categories,users,voting} = require('../models')

var cors = require('cors')

router.use(cors())

router.post('/add',async(req,res)=>{

	try{
		let {categoryname,votingname,user_id} = req.body

		// Validate user input
    if (!(categoryname && votingname)) {
      return res.status(400).json("All input is required");
    }

		let user = await users.findOne({
		where:{username : user_id}
	})

		if(user){

			let validateVoting = await voting.findOne({
				where:{
					votingname,
					username:user_id
				}
			})

			if(!validateVoting){
				res.status(409).json("Unauthorized access! Voting doesn't")
			}

			let checkIfCategoryExistByUSer = await categories.findOne({
		where:{ user_id,categoryname }
	})

			if(checkIfCategoryExistByUSer){
				return res.status(400).json("Category already exists! Create a new Category")
			}

			let addCategory = await categories.create({categoryname,user_id,votingname})

			res.status(200).json(addCategory)

		}

		else{
			res.status(409).json("Unauthorized access")
		}

	}

	catch (err){
		console.log(err)
	}
	

})





router.get('/:user_id/:votingname',async(req,res)=>{
	try{
		let {user_id,votingname} = req.params

		let data = await categories.findAll({
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