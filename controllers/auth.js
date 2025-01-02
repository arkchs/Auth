import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../services/auth.js';


export async function handleCreateUser(req, res) {
    const { username, name, password } = req.body;
    let user = await User.findOne({username: username});
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    try {
        await User.create({
            username: username, name: name, password: password
        });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export async function handleLoginUser(req, res) {

    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    if (password !== user.password) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    const sessionid = uuidv4();
    const service = new AuthService();
    service.setUser(username,sessionid);
    res.cookie("sessionId", sessionid);
    return res.status(200).json({ message: "Login successful" });
}








