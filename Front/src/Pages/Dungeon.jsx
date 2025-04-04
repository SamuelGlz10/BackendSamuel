import React from 'react'
import { useState, useEffect } from 'react';
import Boton from '../Objects/Boton';


export default function Dungeon() {

    const [timer, setTimer] = useState(0); // Timer en segundos
    const [muertes, setMuertes] = useState(0); // Cantidad de muertes

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
            alert("Has muerto :(");
            setMuertes(muertes + 1);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000); // 1000 milisegundos
    }

    return () => clearInterval(interval);
  }, [timer]);

  const incrementTimer = () => {
    if (timer === 0) {
      setTimer(3);
    } else {
      setTimer(timer + 1);
    }
  };

  function ManageButton() {
    if (timer === 0) {
      return (
        <Boton
          name={"Revivir!"}
          click={incrementTimer}
          className={"custom_button_1"}
          id={"revivir"}
        />
      );
    } else {
      return (
        <Boton
          name={"Aumentar vida!"}
          click={incrementTimer}
          className={"custom_button_1"}
          id={"aumentar"}
        />
      );
    }
  }

  function ManageDeath() {
    if (muertes === 0) {
      return <p>{":)"}</p>;
    } else if (muertes === 1) {
      return <p>Has muerto {muertes} vez!</p>;
    } else {
      return <p>Has muerto {muertes} veces...</p>;
    }
  }

  return (
    <div>
      <h1>Bienvenido al calabozo de la perdición...</h1>
      <p>Cada segundo baja tu vida. Intenta no morir {">:)"}</p>
      <p>Vida: {timer}</p>
      <ManageButton />
      <ManageDeath />
    </div>
  );
}
