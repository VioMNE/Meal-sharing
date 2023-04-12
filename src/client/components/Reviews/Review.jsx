import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewFrom"
import "./Reviews.css";

function Reviews() {
  // @ts-ignore
  const { id } = useParams();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    fetch("api/reviews")
      .then((res) => res.json())
      .then((data) => {
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
        <ReviewForm />
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
                 {review.description}
              </p>
              <div className="review-rating">
                <p></p>
                {fillStars(review.stars)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
export default Reviews;

