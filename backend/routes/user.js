const express = require("express");
const { createUser } = require("../signupval");
const {User} = require("../db");
const jwt = require("jsonwebtoken")

require('dotenv').config()

const router = express.Router();

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const parsed = createUser.safeParse(body);

    if(!parsed.success){
        res.status(411).json({message:"Incorrect Inputs"});
        return;
    }

    const existing = await User.findOne({username:body.username});

    if(existing){
        res.status(411).json({message:"Incorrect Inputs"});
        return;
    }

    const user = await User.create(
        {
            username:body.username,
            password:body.password,
            firstName:body.firstName,
            lastName:body.lastName
        }
    );

    const jsonwt = user._id;
    const token = jwt.sign({jsonwt},process.env.JWT_SECRET_KEY);

    res.json({
        token,
        message:"User Successfully Created"
    })



    









    


})

module.exports = router;

