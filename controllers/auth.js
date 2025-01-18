import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
export async function handleCreateUser(req,res){

    const {username, password, email} = req.body;
    console.log(username);
    console.log(SECRET_KEY);
    if (!SECRET_KEY) {
        return res.status(500).json({message: "Server configuration error"});
    }
    try{
        let user = await User.findOne({username: username});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        //Saving a encrypted version of the password to the database
        user = new User({username,password,email})
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, SECRET_KEY, {expiresIn: 3600}, (err, token)=>{
            if (err) throw err;
            res.status(201).json({token});
        });
    }catch(err){2
        console.log(err.message);
        res.status(500).json({message: "Server Error"});
    }
}


export async function handleLoginUser(req,res){
    const {username, password} = req.body;
    try{
        let user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({message:"User does not exist!"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg: "Incorrect password entered"})
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, SECRET_KEY, {expiresIn: 3600}, (err, token)=>{
            if (err) throw err;
            res.status(201).json({token});21
        });
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: "Server Error"});
    }
}