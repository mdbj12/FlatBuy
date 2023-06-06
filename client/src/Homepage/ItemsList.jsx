import React from "react";
import ItemsCard from "./ItemsCard";

function ItemsList({items}) {
    return (
      <ul>
        {items.map((item) => {
          return <ItemsCard key={item.id} item={item} />;
        })}
      </ul>
    );
}

export default ItemsList;