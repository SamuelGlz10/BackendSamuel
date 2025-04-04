import express from 'express';
import { login, signup } from '../controllers/authController.js';
// No necesita cambios estructurales, solo asegurar que exportas los controladores

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;