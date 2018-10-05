import express from 'express';
import * as HomeController from '../controllers/Home/Home';

// Create router instance
const router: express.Router = express.Router();

// Home Page Index
router.get('/', HomeController.index);

export default router;
