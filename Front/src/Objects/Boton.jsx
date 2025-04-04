import React from 'react';

const Boton = ({ name, click, className, id }) => {
    return (
        <button
            id={id}
            className={className}
            onClick={click}
        >
            {name}
        </button>
    );
};

export default Boton;