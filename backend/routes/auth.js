import 'dotenv/config'
import express from 'express';
import { handleUserLogin, handleUserSignOut, handleUserSignup } from '../controllers/authcontrollers.js';


const router = express.Router();

// POST /auth/signup
router.post('/signup', handleUserSignup );

router.post('/signin', handleUserLogin);

router.get('/signout', handleUserSignOut);

export default router;