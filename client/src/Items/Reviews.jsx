import React, { useState, useEffect} from "react";

const Reviews = ({item}) => {
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
        return (
            <div key={r.id}>
                <p>{r.comment}</p>
                <p>{r.rate_score}</p>
            </div>
        )
    })

    return (
        <div>
            {single_review}
        </div>
    )
}

export default Reviews