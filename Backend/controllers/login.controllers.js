import { sqlConnect, sql } from "../utils/sql.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

      let isLogin = data.recordset[0].password === hashSalt;

      // if (isLogin) {
      //   const token = jwt.sign(
      //     { sub: data.recordset[0].id },
      //     process.env.JWT_SECRET,
      //     { expiresIn: "1h" }
      //   );
      //   res
      //     .status(200)
      //     .json({ isLogin: isLogin, user: data.recordset[0], token: token });
      // }

      res.status(200).json({ isLogin: isLogin, user: data.recordset[0] });
    } else {
      res
        .status(401)
        .json({ isLogin: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const pool = await sqlConnect();
    const { username, password } = req.body;

    const checkUser = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username = @username");

    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = crypto.randomBytes(5).toString("hex");
    const preHash = salt + password;
    const hashing = crypto.createHash("sha256");
    const hash = hashing.update(preHash).digest("hex");
    const hashSalt = salt + hash;

    const insertUser = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashSalt)
      .query(
        "INSERT INTO Users (username, password) VALUES (@username, @password)"
      );

    res.status(200).json({ message: "User created successfully :)" });
  } catch (err) {
    console.error("SQL Query Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};