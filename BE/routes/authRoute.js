import express from 'express';
import { register, login } from '../controllers/authController.js';
const routerAuth = express.Router();

routerAuth.post('/register', register);
routerAuth.post('/login', login);

export default routerAuth;
