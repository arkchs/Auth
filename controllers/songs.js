import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export async function handleGetSongs(req, res){
    res.status(200).json({songsname: 'hemlo'});
}

const SECRET_KEY = process.env.SECRET_KEY;
export async function handleLoggedInUser(req,res,next) {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({message: "No token, authorization denied"});
    }
    else{
        try{
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded.user;
            next();
        }
        catch(err){
            console.log(err.message);
            res.status(500).json({message: "Server Error"});
        }
    }
}