import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Add from "../Pages/Add";
import List from "../Pages/List";
import Header from "../Objects/Header";
import Dungeon from "../Pages/Dungeon";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";

import "../../src/App.css";

function AppBody() {
  const [isLogin, setIsLogin] = useState(() => {
    // Check localStorage for the initial login state
    return localStorage.getItem("isLogin") === "true" || false;
  });

  const [items, setItems] = useState([]);

  useEffect(
    () => {
      if (isLogin) {
        getItems();
      }
    },
    [isLogin] // Lista de variables que si cambian, se ejecuta el useEffect
  );

  const getItems = async () => {
    const result = await fetch("http://localhost:5000/items/");
    const data = await result.json();
    setItems(data);
  };

  const add = async (item) => {
    const result = await fetch("http://localhost:5000/items/", {
      // añadir a base de datos
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await result.json();
    setItems([...items, data.item]);
    alert(`Item added successfully!`);
  };

  const del = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      // borrar de base de datos
      method: "DELETE",
    });
    setItems(items.filter((item) => item.itemID !== id)); // borrar de interfaz
    alert(`Item with ID ${id} deleted successfully`);
    window.location.reload();
  };

  const tryLogin = async (user) => {
    try {
      const result = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      console.log(data);

      if (data.isLogin) {
        setIsLogin(true);
        localStorage.setItem("isLogin", "true");
        return true;
      } else {
        setIsLogin(false);
        localStorage.setItem("isLogin", "false");
        return false;
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      return false;
    }
  };

  const trySignUp = async (user) => {
    try {
      console.log("SignupStep1")
      const result = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log("SignupStep2")

      const data = await result.json();
      console.log(data.message);

      if (!result.ok) {
        throw new Error(data.message);
      }
      return true;

    } catch (error) {
      alert("Signup failed: " + error.message);
      console.error("Failed to fetch:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.setItem("isLogin", "false");
    setIsLogin(false);
  };

  return (
    <div className="app-body">
      <BrowserRouter>
        <Header isLogin={isLogin} logout={logout} />
        <Routes>
          <Route // Default route
            path="/"
            element={
              isLogin ? <Navigate to="/dungeon" /> : <Navigate to="/login" /> // Redireccionar si no esta iniciada sesion
            }
          />
          <Route
            path="/login"
            element={
              isLogin ? (
                <Navigate to="/dungeon" />
              ) : (
                <Login tryLogin={tryLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={<SignUp trySignUp={trySignUp} />}
          />
          <Route
            path="/dungeon"
            element={isLogin ? <Dungeon /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isLogin ? <Add add={add} /> : <Navigate to="/login" />}
          />
          <Route
            path="/list"
            element={
              isLogin ? (
                <List items={items} ondelete={del} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppBody;
