import express from 'express';
import * as AuthController from '../controllers/Auth/Auth';
import { Validations } from '../schemas/User/User';

// Create router instance
const router: express.Router = express.Router();

// Auth SignUp
router.post('/signup', Validations.signup, AuthController.postSignUp);

// Auth Login
router.post('/login', Validations.login, AuthController.postLogin);

export default router;
