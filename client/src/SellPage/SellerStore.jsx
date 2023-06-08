import { useEffect, useState } from "react"
import SellerItem from "./SellerItem"
import SellCard from "./SellCard"

const SellerStore = () => {

    const [itemsList, setItems] = useState([{
        "inventory_count": 0,
        "description": "Temp",
        "name": "Temp",
        "category": "Temp",
        "id": 1,
        "created_at": "2023-06-07 15:13:01",
        "price": 0,
        "updated_at": null,
        "image": "Temp"
      }])

    useEffect(() => {
        fetch('http://127.0.0.1:5556/items')
        .then(res => res.json())
        .then(data => setItems(data))
    }, [])

    console.log(itemsList)

    const sellerItems = itemsList

    return (
        <div style={{ display: "flex", 
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                      margin: "2rem" }}>
                        <SellCard/>
          {sellerItems.map((item) => {
            return <SellerItem key={item.id} carditem={item}/>;
          })}
        </div>
      );
}

export default SellerStore