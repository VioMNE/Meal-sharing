import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewFrom"
import "./Reviews.css";

function Reviews() {
  // @ts-ignore
  const { id } = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState();
  const [requestState, setRequestState] = useState("loading");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("api/reviews")
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  }, []);

  const fillStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i className="fas fa-star" key={i}></i>);
      } else {
        stars.push(<i className="far fa-star" key={i}></i>);
      }
    }
    return stars;
  };

  return (
    <div className="review-page">
      <div>
        <ReviewForm/>
      </div>
      <h2> Reviews by costumers :</h2>
      {reviews ? (
        <ul className="review-list">
          {reviews.
// @ts-ignore
          map((review) => (
            <li className="review-card" key={review.id}>
              <p className="review-title">{review.title}</p>
              <p className="review-description">
                Description: {review.description}
              </p>
              <div className="review-rating">
                <p>Rating:</p>
                {fillStars(review.stars)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>{isLoading && <p>Loading...</p>}</div>
      )}
    </div>
  );
}
export default Reviews;
