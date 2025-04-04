import React from 'react'
import Boton from './Boton'

const Item = ({item, ondelete}) => {
    return (
        <div>
            <ul>
                <li>{item.Nombre}</li>
                <li>{item.Precio}</li>
                <li><Boton name={'X'} click={() => ondelete(item.ItemID)} /></li>
            </ul>
        </div>
    )
}

export default Item;