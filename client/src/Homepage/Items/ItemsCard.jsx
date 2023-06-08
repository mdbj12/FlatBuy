import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

function ItemsCard({ item }) {
  // when item is clicked, this information should popup in another window
  // add this functionality piece later
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
          <p>{r.comment}</p>
          <p>{r.rate_score}</p>
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
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <Button
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

