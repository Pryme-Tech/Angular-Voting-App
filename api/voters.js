const express = require('express')

const { voters, users, voting } = require('../models')

// var cors = require('cors')

const router = express.Router()

router.post('/register',async (req,res)=>{

   try{

	const { votersname, votingname } = req.body

	if(!( votersname && votingname)){
      return res.status(406).json("*** All input is required ***")
   }

   else{

      let index_no = (Math.floor(Math.random() * 1000000) +1).toString()

      let checkIndex = await voters.findOne({
         where:{
            index_no,votingname
         }
      })

      if(checkIndex){
        return res.status(200).json("Error creating index please try again")
      }

      else{

         let checkVoting = await voting.findOne({
            where:{
               votingname
            }
         })

         if(!checkVoting){
            return res.status(200).json("Unauthorised access")
         }

         let createVoter = await voters.create({index_no,votersname,votingname})

         if(createVoter){
            res.status(200).json({
               "msg" : "Voter Successfully Created",
               "index_no" : index_no
            })
         }

      }

   }
}

catch (err){
   console.log('err')
}

})


router.post('/access',async(req,res)=>{
   const { index_no,votingname } = req.body

   if(!(index_no && votingname)){
      return res.status(406).json("*** All input is required ***")
   }

   else{
      let authVoter = await voters.findOne({
         where:{
            index_no,votingname
         }
      })

      let checkVoting = await voting.findOne({
         where:{
            votingname
         }
      })

      if(authVoter && checkVoting){
         res.status(200).json({
            "voterId" : authVoter.index_no,
            "voter" : authVoter.votersname,
            "msg" : "Access Granted",
            "user" : checkVoting.username
         })
      }

      else{
         res.status(409).json("Unauthorised access")
      }
   }

})

router.get('/:votingname', async(req,res)=>{

   let { votingname } = req.params

   let allVoters = await voters.findAll({
      where:{
         votingname
      }
   })

   res.json(allVoters)

})

module.exports = router
