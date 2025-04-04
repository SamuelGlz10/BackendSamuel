import React from "react";
import Item from "../Objects/Item";

const List = ({ items, ondelete }) => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <Item key={item.ItemID} item={item} ondelete={ondelete} />
        ))}
      </ul>
    </div>
  );
};

export default List;
