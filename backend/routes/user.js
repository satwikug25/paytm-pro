const express = require("express");
const { createUser, userSignin } = require("../signupval");
const {User} = require("../db");
const jwt = require("jsonwebtoken")

require('dotenv').config()

const router = express.Router();

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const parsed = createUser.safeParse(body);

    if(!parsed.success){
        res.status(411).json({message:"Incorrect Inputs1"});
        return;
    }

    const existing = await User.findOne({username:body.username});

    if(existing){
        res.status(411).json({message:"Incorrect Inputs2"});
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

router.post("/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const parsed = userSignin.safeParse(req.body);

    if(!parsed.success){
        res.status(411).json({"msg":"Incorrect Inputs"});
        return;
    }

    const user = await User.findOne({username:username});

    if(!user){
        res.status(411).json({"msg":"Incorrect Doesn't Exist"});
        return;
        
    }

    if(user.password == password){
        const jsonwt = user._id;
        const token = jwt.sign({jsonwt},process.env.JWT_SECRET_KEY);
        res.json({token,msg:"User Authenticated"});

        

    }
    else{
        res.json({msg:"Wrong Password"});
    }











})

module.exports = router;

