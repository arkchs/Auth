import { AuthService } from "../services/auth.js";

export async function handleLoggedIn(req, res, next) {
    const sessionid = req.cookies.sessionid;
    if(!sessionid){
        return res.status(401).json({message: "No Session Detected. Please Login!"});
    }
    const service = new AuthService();
    const user = service.getUser(sessionid);
    if(!user){
        return res.status(401).json({message: "Invalid Session. Please Login!"});
    }
    return res.status(200).json({message: "Successful Session Authentication"});
}