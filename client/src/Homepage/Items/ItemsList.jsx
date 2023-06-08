import React from "react";
import ItemsCard from "./ItemsCard";

function ItemsList({ items }) {
  return (
    <div style={{ display: "flex", 
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  margin: "2rem" }}>
      {items.map((item) => {
        return <ItemsCard key={item.id} item={item} />;
      })}
    </div>
  );
}

export default ItemsList;
