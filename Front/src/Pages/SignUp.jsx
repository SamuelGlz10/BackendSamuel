import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ trySignUp }) => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (username.trim() === "" || password.trim() === "") {
        alert("Please enter both username and password.");
        return;
        }

        const success = await trySignUp({ username, password }); // Send username and password as an object

        if (success) {
            alert("Signup successful!");
            setUsername(""); // Clear the input fields after successful signup
            setPassword("");
            navigate("/login");
        }
    };

    return (
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
        </div>
    );
};

export default SignUp;