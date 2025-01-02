import express from 'express';
import {handleCreateUser, handleLoginUser} from './controllers/auth.js';
import {connectDB} from './db.js';
import cookieParser from 'cookie-parser';
import { handleGetSongs } from './controllers/songs.js';
import { handleLoggedIn } from './middlewares/session_auth.js';

connectDB();

const PORT = 3000;
const app = express();
const AuthRouter = express.Router();
const SongsRouter = express.Router();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth',AuthRouter);
app.use('/api/songs',handleLoggedIn, SongsRouter);
SongsRouter.get('/', handleGetSongs);
AuthRouter.post('/register', handleCreateUser);
AuthRouter.post('/login', handleLoginUser);


app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})