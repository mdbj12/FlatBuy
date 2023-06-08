import React from "react";
import ItemsCard from "./ItemsCard";

function ItemsList({items, userData}) {
    return (
      <ul>
        {items.map((item) => {
          return (
            <ItemsCard
              key={item.id}
              item={item}
              userData={userData}
            />
          );
        })}
      </ul>
    );
}

export default ItemsList;