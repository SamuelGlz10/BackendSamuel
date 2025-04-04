import express from 'express';
import loginRoutes from './login.js';
import { authenticate } from '../middlewares/auth.js'; // Importar el middleware

const router = express.Router();

// Rutas públicas (sin autenticación)
router.use('/auth', loginRoutes);

// Rutas protegidas (ejemplos - añade las tuyas)
router.get('/profile', authenticate, (req, res) => {
  res.json({ 
    message: 'Ruta protegida',
    user: req.user // Datos del usuario del token
  });
});

// Ejemplo con controlador externo
// router.get('/users', authenticate, usersController.getAll);

export default router;