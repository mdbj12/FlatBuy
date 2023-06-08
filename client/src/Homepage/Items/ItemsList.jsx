import React from "react";
import ItemsCard from "./ItemsCard";

function ItemsList({ items, userData }) {

  return (
    <div style={{ display: "flex", 
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  margin: "2rem" }}>
      {items.map((item) => {
        return <ItemsCard key={item.id} item={item} userData={userData} />;
      })}
    </div>
  );
}

export default ItemsList;
