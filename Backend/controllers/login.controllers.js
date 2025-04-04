import { sqlConnect, sql } from "../utils/sql.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const pool = await sqlConnect();
    const data = await pool
      .request()
      .input("username", sql.VarChar, req.body.username)
      .query("SELECT * FROM Users WHERE username = @username");

    if (data.recordset.length > 0) {
      // Hashing process (mismo que el signup)
      const salt = data.recordset[0].password.slice(0, 10);
      const preHash = salt + req.body.password;
      const hashing = crypto.createHash("sha256");
      const hash = hashing.update(preHash).digest("hex");
      const hashSalt = salt + hash;
      
      const isLogin = data.recordset[0].password === hashSalt;

      if (isLogin) {
        // Crear el token JWT
        const user = data.recordset[0];
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username
            // Puedes añadir más datos del usuario si es necesario
          },
          process.env.JWT_SECRET || 'tu_clave_secreta_por_defecto', // Usa una variable de entorno en producción
          { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Tiempo de expiración
        );

        // Excluir la contraseña del objeto de usuario que enviamos
        const { password, ...userData } = user;

        res.status(200).json({ 
          success: true,
          message: "Login exitoso",
          token,
          user: userData
        });
      } else {
        res.status(401).json({ 
          success: false,
          message: "Credenciales inválidas" 
        });
      }
    } else {
      res.status(401).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error en el servidor" 
    });
  }
};