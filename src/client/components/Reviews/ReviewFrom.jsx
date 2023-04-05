import React, { useState } from "react";
import "./Reviews.css";
function ReviewForm({ mealId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState();

  const handleFormSubmit = () => {
    const data = {
      meal_id: mealId,
      title: title,
      description: description,
      stars: rating,
      created_date: new Date().toJSON().slice(0, 10),
    };
    console.log(data);
    setIsLoading(true);

    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTitle("");
        setDescription("");
        setRating("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
      // @ts-ignore
      .finally(alert(`Your review has been sent.`));
  };
  return (
    <div className="reviewpage">
      <form className="res-form-container">
        <h3 className="res-title">Write a review on this dish.</h3>
        <div className="res-form-input">
          <label htmlFor="title">*Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="title"
            required
          />
        </div>
        <div className="res-form-input">
          <label htmlFor="description">*Comments: </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="description"
            required
          />
        </div>
        <div className="res-form-input">
          <label htmlFor="rating">*Rating: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
            id="stars"
            required
          />
        </div>
        <button type="button" onClick={handleFormSubmit}>
          Send review
        </button>
      </form>
    </div>
  );
}
export default ReviewForm;
