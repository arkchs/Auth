import express from 'express';
import {connectDB} from 'db.js';
import {handleCreateUser, handleLoginUser} from './controllers/auth.js';
import {handleLoggedInUser} from './controllers/songs.js';
import { handleGetSongs } from './controllers/songs.js';

const PORT= 3000;
const app = express();
const AuthRouter = express.Router();
const SongsRouter= express.Router();

app.use(express.json());
app.use('/api/auth',AuthRouter);
app.use('/api/songs',handleLoggedInUser, SongsRouter);

AuthRouter.post('/register', handleCreateUser);
AuthRouter.post('/login', handleLoginUser);
SongsRouter.get('/api/songs',handleGetSongs)

connectDB();
app.listen(PORT,()=>{
    console.log(`Server connected on port...${PORT}`)
})
