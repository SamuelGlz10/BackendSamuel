import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ tryLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    const isLogin = await tryLogin({ username, password }); // Esto da un objeto "abstracto" con propiedades 'usernam' y 'password'
    
    if (isLogin) {
      setUsername("");
      setPassword("");
      alert("Login successful!");
      navigate("/dungeon");
    } else {
      alert("Login failed: Incorrect username or password.");
    }
  }

  return (
    <form onSubmit={onsubmit}>
      <Box
        margin={"auto"}
        flexDirection={"column"}
        display={"flex"}
        width={400}
        marginTop={10}
      >
        <TextField
          label={"Username"}
          variant={"outlined"}
          margin={"normal"}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label={"Password"}
          variant={"outlined"}
          margin={"normal"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type={'submit'}
          variant={"contained"}
        >
          Login
        </Button>

      </Box>
    </form>
  )
}

export default Login;