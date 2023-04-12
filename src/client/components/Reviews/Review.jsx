import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="review-page">
      {notFound ? <p>The page you are looking for was not found.</p> : null}
      <h1>What other people say about poke bowl</h1>
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
              <p className="review-rating">Rating: {review.stars}</p>
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
