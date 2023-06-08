import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

function ItemsCard({ item, userData  }) {
  // when item is clicked, this information should popup in another window
  // add this functionality piece later
const handleAddToCart = () => {
  console.log("clicked");
  fetch(`http:///127.0.0.1:5556/cart/${userData.id}/${item.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      consumer_id: userData.id,
      item_id: item.id,
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
};

const [reviews, setReviews] = useState([])
useEffect(() => {
  fetch(`http://127.0.0.1:5556/rating/${item.id}`)
      .then((r) => r.json())
      .then((data) => {
          setReviews(data)
          console.log(data)
      });
}, []);
 const single_review = reviews.map(r => {
  return <div key={r.id}>
          <p>comment {r.comment}</p>
          <p>Rated {r.rate_score}</p>
        </div>
 })
 return (
  <Card className="w-96">
    <CardHeader shadow={false} floated={false} className="h-96">
      <img 
        src={item.image}
        className="w-full h-full object-cover"
      />
    </CardHeader>
    <CardBody>
      <div className="flex items-center justify-between mb-2">
        <Typography color="blue-gray" className="font-medium">
          {item.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium">
          ${item.price}
        </Typography>
      </div>
      <Typography variant="small" color="gray" className="font-normal opacity-75">
        {item.description}
        {single_review}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <Button
        onClick={handleAddToCart}
        ripple={false}
        fullWidth={true}
        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
      >
        Add to Cart
      </Button>
      
    </CardFooter>
  </Card>
);
}

export default ItemsCard;
