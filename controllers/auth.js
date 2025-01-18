import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
export async function handleCreateUser(req,res){
    const {username, password, email} = req.body;
    try{
        let user = await User.findOne({username: username});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        //Saving a encrypted version of the password to the database
        user = new User({username,password,email})
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.genHash(password, salt);
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
    }catch(err){
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
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.genHash(password, salt);
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
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: "Server Error"});
    }
}