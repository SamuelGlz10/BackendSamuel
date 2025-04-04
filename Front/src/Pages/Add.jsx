import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = ({ add }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    
    const navigate = useNavigate();

    const onsubmit = (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert("Please add an item and a price");
            return;
        }
        if(isNaN(price)){
            alert("Price must be a number");
            return;
        }
        add({ name: name, price: price });
        setName("");
        setPrice("");
        navigate('/list');
    };

    return (
        <form onSubmit={onsubmit}>
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Name'
                type="text"
                name=""
                id=""
            />  
            <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder='Price'
                type="text"
                name=""
                id=""
            />
            <button type="submit" value="add">Add</button>
        </form>
    )
};

export default Add;