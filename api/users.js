const express = require('express')

const { users } = require('../models')

const router = express.Router()

var cors = require('cors')

router.use(cors())

router.post('/register',async (req,res)=>{
	

try{

	// Get User Inputs
	const { username,password } = req.body


	let  msg = ''
	let status = ''

	// Validate user input
    if (!(username && password)) {
      return res.status(400).json("*** All input is required ***");
    }

	let checkIfUserNameExists = await users.findOne({
		where:{
			username
		}
	})

	if(checkIfUserNameExists){

		return res.status(409).json("User Already Exist. Please Login");

	// msg = "User Exists"
	// status = false
}

else{
	let register = await users.create({username,password})
	msg = "Registration Successful"
	status = true

	res.status(201).json("User Successfully Created")
}

}

catch (err){

	console.log(err)

	status = false
}

// res.json({
// 	  "msg" : msg,
//       "status": status
//    });

})

router.post('/login',async(req,res)=>{

try{
	// Get user input
	let { username,password } = req.body

	// Validate user input
    if (!(username && password)) {
      return res.status(400).json("*** All input is required ***");
    }

	let auth = await users.findOne({
		where:{
			username,password
		}
	})

	if(auth){
		res.status(200).json({
			"status" : 1,
			"statusMsg" : "Logged in",
			"user" : auth.username
		});
	}
	else{
		res.status(401).json("Username and password does not match");
	}
}
catch (err){
	console.log(err)
}
})



router.get('/',async (req,res)=>{
	//const { username,password } = req.body

	let allUsers = await users.findAll({
		where:{username:"latif83"}
	})

	res.json({
      "status": true,
      "data": allUsers
   });
})

module.exports = router